;(() => {
	'use strict'

	const overlayConfig = window.OVERLAY_CONFIG

	if (overlayConfig.effect !== 'bats') {
		return
	}

	const config = overlayConfig.bats

	const canvas = document.getElementById('bats')
	const ctx = canvas.getContext('2d')

	let bats = []

	function random(min, max) {
		return Math.random() * (max - min) + min
	}

	function resize() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	function createBat(startAnywhere = true) {
		const direction = Math.random() > 0.5 ? 1 : -1
		const size = random(config.minSize, config.maxSize)

		return {
			x: startAnywhere
				? random(0, canvas.width)
				: direction === 1
					? -size * 2
					: canvas.width + size * 2,

			y: random(50, canvas.height - 50),

			size,
			speed: random(config.minSpeed, config.maxSpeed),
			direction,

			// Flight movement
			bobOffset: random(0, Math.PI * 2),
			bobSpeed: random(0.02, 0.05),
			bobAmount: random(0.5, 1.5),

			// Wing animation
			wingOffset: random(0, Math.PI * 2),
			wingSpeed: random(config.minFlapSpeed, config.maxFlapSpeed),

			opacity: random(0.65, 1)
		}
	}

	function init() {
		bats = []

		for (let i = 0; i < config.count; i++) {
			bats.push(createBat(true))
		}
	}

	function resetBat(bat) {
		Object.assign(bat, createBat(false))
	}

	function update() {
		for (const bat of bats) {
			bat.x += bat.speed * bat.direction

			bat.bobOffset += bat.bobSpeed
			bat.wingOffset += bat.wingSpeed

			bat.y += Math.sin(bat.bobOffset) * bat.bobAmount

			if (
				bat.x > canvas.width + bat.size * 3 ||
				bat.x < -bat.size * 3 ||
				bat.y < -100 ||
				bat.y > canvas.height + 100
			) {
				resetBat(bat)
			}
		}
	}

	function drawBat(bat) {
		ctx.save()

		ctx.translate(bat.x, bat.y)

		// Flip bats flying toward the left
		if (bat.direction === -1) {
			ctx.scale(-1, 1)
		}

		ctx.globalAlpha = bat.opacity
		ctx.fillStyle = config.color || '#050505'

		const s = bat.size

		/*
		 * Produces a value between roughly -1 and +1.
		 * This makes the wings flap.
		 */
		const flap = Math.sin(bat.wingOffset)

		const wingY = flap * s * 0.45

		// BODY
		ctx.beginPath()
		ctx.ellipse(0, 0, s * 0.18, s * 0.45, 0, 0, Math.PI * 2)
		ctx.fill()

		// HEAD
		ctx.beginPath()
		ctx.arc(0, -s * 0.35, s * 0.17, 0, Math.PI * 2)
		ctx.fill()

		// LEFT EAR
		ctx.beginPath()
		ctx.moveTo(-s * 0.12, -s * 0.45)
		ctx.lineTo(-s * 0.18, -s * 0.7)
		ctx.lineTo(-s * 0.02, -s * 0.5)
		ctx.fill()

		// RIGHT EAR
		ctx.beginPath()
		ctx.moveTo(s * 0.12, -s * 0.45)
		ctx.lineTo(s * 0.18, -s * 0.7)
		ctx.lineTo(s * 0.02, -s * 0.5)
		ctx.fill()

		// LEFT WING
		ctx.beginPath()

		ctx.moveTo(-s * 0.1, -s * 0.15)

		ctx.quadraticCurveTo(-s * 0.65, -s * 0.5 - wingY, -s, wingY)

		ctx.quadraticCurveTo(-s * 0.7, s * 0.05, -s * 0.55, s * 0.3)

		ctx.quadraticCurveTo(-s * 0.35, s * 0.1, -s * 0.1, s * 0.25)

		ctx.closePath()
		ctx.fill()

		// RIGHT WING
		ctx.beginPath()

		ctx.moveTo(s * 0.1, -s * 0.15)

		ctx.quadraticCurveTo(s * 0.65, -s * 0.5 - wingY, s, wingY)

		ctx.quadraticCurveTo(s * 0.7, s * 0.05, s * 0.55, s * 0.3)

		ctx.quadraticCurveTo(s * 0.35, s * 0.1, s * 0.1, s * 0.25)

		ctx.closePath()
		ctx.fill()

		ctx.restore()
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (const bat of bats) {
			drawBat(bat)
		}
	}

	function animate() {
		update()
		draw()

		requestAnimationFrame(animate)
	}

	window.addEventListener('resize', () => {
		resize()
		init()
	})

	resize()
	init()
	animate()
})()
