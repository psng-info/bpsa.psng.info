#!/bin/sh
# Rendert form-banner.html zu form-banner.png (1600 × 400) für Google Forms.
cd "$(dirname "$0")"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=1 --window-size=1600,400 \
  --virtual-time-budget=3000 --screenshot="$PWD/form-banner.png" "file://$PWD/form-banner.html"
