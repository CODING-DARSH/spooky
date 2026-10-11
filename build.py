#!/usr/bin/env python3
"""Bundle index.html + style.css + engine.js + props.js + scenes/*.js into dist/the-eye.html (one file for hosting)."""
import re, pathlib
root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text()
html = html.replace('<link rel="stylesheet" href="style.css">', "<style>\n" + (root / "style.css").read_text() + "</style>")
def inline(m):
    return "<script>\n" + (root / m.group(1)).read_text() + "\n</script>"
html = re.sub(r'<script src="((?:engine|props|scenes/)[^"]*\.js)"></script>', inline, html)
out = root / "dist"; out.mkdir(exist_ok=True)
(out / "the-eye.html").write_text(html)
print("built", out / "the-eye.html", len(html) // 1024, "KB")
