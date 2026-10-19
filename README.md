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
speed, and colors in the `bats2` config block.

Use `?effect=bats` for the pixel-art bats from
[Timothy Guo's Bat Pixel Art Animation](https://codepen.io/timothyguo/pen/jbarzP).
The seven original animation frames are cached locally and drawn with crisp
pixels. Adjust count, flight/flap speeds, body/outline/eye colors, and size in
the `bats` config block. Sprite sizes round to multiples of 64 pixels.

The package makes no StreamElements requests and uses no external libraries.
 
Use `?effect=xmas-lights` for a glowing, twinkling light string around all four
edges. Adjust spacing, bulb dimensions, inset, colors, and twinkle in the
`'xmas-lights'` block in `config.js`. Inspired by
[Toby J's Pure CSS Christmas Lights](https://codepen.io/tobyj/pen/QjvEex),
with a continuous perimeter wire and inward-facing bulbs on every side.
The original mask is stored locally at `assets/frame-mask.png`.
