(() => {
  "use strict";

  const overlayConfig = window.OVERLAY_CONFIG;

  // Don't run snow unless enabled
  if (overlayConfig.effect !== "snow") {
    return;
  }

  const config = overlayConfig.snow;

  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");

  let snowflakes = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFlake(startAnywhere = true) {
    return {
      x: random(0, canvas.width),

      y: startAnywhere ? random(0, canvas.height) : random(-50, -10),

      size: random(config.minSize, config.maxSize),
      speed: random(config.minSpeed, config.maxSpeed),
      drift: random(-config.drift, config.drift),
      opacity: random(0.4, 1),
    };
  }

  function init() {
    snowflakes = [];

    for (let i = 0; i < config.flakes; i++) {
      snowflakes.push(createFlake());
    }
  }

  function update() {
    for (const flake of snowflakes) {
      flake.y += flake.speed;
      flake.x += flake.drift;

      if (
        flake.y > canvas.height + 10 ||
        flake.x < -10 ||
        flake.x > canvas.width + 10
      ) {
        Object.assign(flake, createFlake(false));
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const flake of snowflakes) {
      ctx.beginPath();

      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;

      ctx.fill();
    }
  }

  function animate() {
    update();
    draw();

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resize();
    init();
  });

  resize();
  init();
  animate();
})();
