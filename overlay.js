(() => {
  "use strict";

  // Values recovered from StreamElements overlay 622a533970978232a446043e.
  const config = Object.freeze({
    width: 1920,
    height: 1080,
    firstColor: "#fffd00",
    secondColor: "#ffc400",
    thirdColor: "#880000",
    durationSeconds: 15,
  });

  const root = document.documentElement;
  const spin = document.getElementById("spin");
  const spinSize = Math.round(Math.hypot(config.width, config.height)) + 5;

  root.style.setProperty("--frame-width", `${config.width}px`);
  root.style.setProperty("--frame-height", `${config.height}px`);
  root.style.setProperty("--first-color", config.firstColor);
  root.style.setProperty("--second-color", config.secondColor);
  root.style.setProperty("--third-color", config.thirdColor);
  root.style.setProperty("--spin-duration", `${config.durationSeconds}s`);

  Object.assign(spin.style, {
    width: `${spinSize}px`,
    height: `${spinSize}px`,
    marginLeft: `${-(spinSize - config.width) / 2}px`,
    marginTop: `${-(spinSize - config.height) / 2}px`,
  });
})();
