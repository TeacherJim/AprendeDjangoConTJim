#!/usr/bin/env python3
"""Validate internal links in HTML files.

Ignores content inside <pre>/<code> (tutorial code samples often contain
unescaped Django templates and student-portfolio paths that are not real
site links).
"""

import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IGNORE_PREFIXES = ("http://", "https://", "mailto:", "tel:", "javascript:", "#")
CODE_BLOCK_RE = re.compile(
    r"<(pre|code|samp|kbd)\b[^>]*>.*?</\1>",
    re.IGNORECASE | re.DOTALL,
)


class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in ("href", "src") and value:
                self.links.append(value.strip())


def strip_code_blocks(html: str) -> str:
    """Remove code samples so educational examples are not treated as links."""
    previous = None
    current = html
    # Nested or adjacent blocks: iterate until stable
    while previous != current:
        previous = current
        current = CODE_BLOCK_RE.sub("", current)
    return current


def is_external(url: str) -> bool:
    if any(url.startswith(p) for p in IGNORE_PREFIXES):
        return True
    if "{%" in url or "{{" in url or "{#" in url:
        return True
    return False


def resolve_path(html_file: Path, url: str) -> Path:
    if url.startswith("/"):
        return ROOT / url.lstrip("/")
    return (html_file.parent / url).resolve()


def check_file(html_path: Path):
    content = strip_code_blocks(html_path.read_text(encoding="utf-8"))
    extractor = LinkExtractor()
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
            try:
                missing = str(target.relative_to(ROOT))
            except ValueError:
                missing = str(target)
            errors.append((str(html_path.relative_to(ROOT)), url, missing))

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
