#!/usr/bin/env python3
"""Builds index.html by bundling src/template.html, src/gen.js, and src/app.js."""
from pathlib import Path

root = Path(__file__).parent
tpl = (root / "src" / "template.html").read_text(encoding="utf-8")
gen_js = (root / "src" / "gen.js").read_text(encoding="utf-8")
app_js = (root / "src" / "app.js").read_text(encoding="utf-8")

out = tpl.replace("/* __INJECT_GEN_JS__ */", gen_js).replace("/* __INJECT_APP_JS__ */", app_js)
(root / "index.html").write_text(out, encoding="utf-8")
print("✓ Built index.html successfully.")
