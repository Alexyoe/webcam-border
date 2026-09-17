(() => {
  "use strict";

  const config = Object.freeze({
    width: 1920,
    height: 1080,

    // "rainbow" or "custom"
    mode: "custom",

    // Used when mode is "custom"
    firstColor: "#fffd00",
    secondColor: "#ffc400",
    thirdColor: "#880000",

    // Speed of rotation
    durationSeconds: 15,
  });

  const root = document.documentElement;
  const spin = document.getElementById("spin");

  const spinSize =
    Math.round(Math.hypot(config.width, config.height)) + 5;

  root.style.setProperty("--frame-width", `${config.width}px`);
  root.style.setProperty("--frame-height", `${config.height}px`);
  root.style.setProperty("--first-color", config.firstColor);
  root.style.setProperty("--second-color", config.secondColor);
  root.style.setProperty("--third-color", config.thirdColor);
  root.style.setProperty("--spin-duration", `${config.durationSeconds}s`);

  // Set color mode
  if (config.mode === "rainbow") {
    spin.style.background = `
      conic-gradient(
        from 0deg,
        #ff0000,
        #ff8000,
        #ffff00,
        #00ff00,
        #00ffff,
        #0080ff,
        #8000ff,
        #ff00ff,
        #ff0000
      )
    `;
  }

  Object.assign(spin.style, {
    width: `${spinSize}px`,
    height: `${spinSize}px`,
    marginLeft: `${-(spinSize - config.width) / 2}px`,
    marginTop: `${-(spinSize - config.height) / 2}px`,
  });
})();