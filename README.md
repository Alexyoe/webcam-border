# Animated Webcam Frame

Standalone version of StreamElements overlay `622a533970978232a446043e`.

## Use in OBS

1. Upload this entire folder to any static web host.
2. Add an OBS **Browser Source** pointing to the hosted `index.html` URL.
3. Set the Browser Source width to **1920** and height to **1080**.

You can also enable **Local file** in OBS and select `index.html` directly.

## Customize

Edit `window.OVERLAY_CONFIG` in `config.js`. The original configured
values are preserved: 1920×1080, a 15-second rotation, and yellow/yellow/dark-red
gradient stops.

Select an effect with `index.html?effect=bats2` (or set `effect: 'bats2'` in
`config.js`). The `bats2` preset uses articulated, scalloped wings with subtle
membrane ribs, pointed ears, and smooth banking flight. Adjust its count, size,
speed, and colors in the `bats2` config block. The original `bats` preset is
still available with `?effect=bats`.

The package makes no StreamElements requests and uses no external libraries.
The original mask is stored locally at `assets/frame-mask.png`.
