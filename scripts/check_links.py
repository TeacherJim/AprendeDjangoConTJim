#!/usr/bin/env python3
"""Validate internal links in HTML files."""

import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IGNORE_PREFIXES = ("http://", "https://", "mailto:", "tel:", "javascript:", "#")
ATTRS = ("href", "src")


class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ATTRS and value:
                self.links.append(value.strip())


def is_external(url):
    return any(url.startswith(p) for p in IGNORE_PREFIXES)


def resolve_path(html_file, url):
    if url.startswith("/"):
        return ROOT / url.lstrip("/")
    return (html_file.parent / url).resolve()


def check_file(html_path):
    rel = html_path.relative_to(ROOT)
    extractor = LinkExtractor()
    try:
        content = html_path.read_text(encoding="utf-8")
    except OSError as e:
        return [(str(rel), url, f"Cannot read: {e}") for url in []]

    extractor.feed(content)
    errors = []

    for url in extractor.links:
        if is_external(url):
            continue
        clean = url.split("?")[0].split("#")[0]
        if not clean:
            continue
        target = resolve_path(html_path, clean)
        if not target.exists():
            errors.append((str(rel), url, str(target.relative_to(ROOT) if target.is_relative_to(ROOT) else target)))

    return errors


def main():
    html_files = sorted(ROOT.rglob("*.html"))
    all_errors = []
    ok_count = 0

    for html_file in html_files:
        errors = check_file(html_file)
        rel = html_file.relative_to(ROOT)
        if errors:
            for src, url, missing in errors:
                all_errors.append(f"[ERROR] {src} -> {url} (missing: {missing})")
        else:
            ok_count += 1
            print(f"[OK] {rel}")

    if all_errors:
        print()
        for err in all_errors:
            print(err)
        print(f"\n{ok_count} files OK, {len(all_errors)} broken link(s)")
        sys.exit(1)

    print(f"\nAll {ok_count} HTML files passed link validation.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
