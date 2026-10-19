;(() => {
	'use strict'
	if (window.OVERLAY_CONFIG.effect !== 'bats2') return

	const config = window.OVERLAY_CONFIG.bats2
	const canvas = document.getElementById('bats')
	const ctx = canvas.getContext('2d')
	const random = (min, max) => min + Math.random() * (max - min)
	let bats = []
	let previousTime

	function createBat(anywhere = true) {
		const direction = Math.random() < 0.5 ? -1 : 1
		const size = random(config.minSize, config.maxSize)
		return {
			x: anywhere ? random(0, canvas.width) : direction > 0 ? -size : canvas.width + size,
			y: random(0, canvas.height),
			size, direction,
			speed: random(config.minSpeed, config.maxSpeed),
			phase: random(0, Math.PI * 2),
			flapSpeed: random(config.minFlapSpeed, config.maxFlapSpeed),
			drift: random(0, Math.PI * 2),
			opacity: random(0.8, 1)
		}
	}

	function resize() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		bats = Array.from({ length: config.count }, () => createBat())
	}

	function wing(side, flap) {
		ctx.save()
		ctx.scale(side, 1)
		// The wrist leads the stroke; the long fingers trail and flex.
		const wristY = -0.15 - flap * 0.15
		const tipX = 0.42 + (1 - flap) * 0.04
		const tipY = -0.08 - flap * 0.32
		ctx.beginPath()
		ctx.moveTo(0.035, -0.06)
		ctx.bezierCurveTo(0.10, -0.14, 0.16, wristY - 0.04, 0.22, wristY)
		ctx.quadraticCurveTo(0.34, tipY - 0.03, tipX, tipY)
		// Three concave membrane bays between pointed fingers.
		ctx.quadraticCurveTo(0.32, tipY + 0.12, 0.32, 0.13 - flap * 0.12)
		ctx.quadraticCurveTo(0.24, 0.055 - flap * 0.06, 0.22, 0.20 - flap * 0.04)
		ctx.quadraticCurveTo(0.14, 0.11, 0.13, 0.23)
		ctx.quadraticCurveTo(0.08, 0.16, 0.035, 0.14)
		ctx.closePath()
		ctx.fillStyle = config.membraneColor
		ctx.fill()
		ctx.strokeStyle = config.color
		ctx.lineWidth = 0.014
		ctx.lineJoin = 'round'
		ctx.stroke()

		ctx.beginPath()
		ctx.moveTo(0.04, -0.05)
		ctx.lineTo(0.22, wristY)
		ctx.lineTo(tipX, tipY)
		for (const [x, y] of [[0.32, 0.13 - flap * 0.12], [0.22, 0.20 - flap * 0.04], [0.13, 0.23]]) {
			ctx.moveTo(0.22, wristY)
			ctx.quadraticCurveTo(x - 0.025, y - 0.07, x, y)
		}
		ctx.strokeStyle = config.ribColor
		ctx.lineWidth = 0.005
		ctx.stroke()
		ctx.restore()
	}

	function drawBat(bat) {
		const flap = Math.sin(bat.phase)
		ctx.save()
		ctx.translate(bat.x, bat.y + Math.sin(bat.drift) * bat.size * 0.12)
		ctx.rotate(bat.direction * (0.10 + Math.cos(bat.drift) * 0.10))
		ctx.scale(bat.size * bat.direction, bat.size)
		ctx.globalAlpha = bat.opacity
		wing(-1, flap)
		wing(1, flap)
		ctx.fillStyle = config.color
		// Compact furry body, pointed tail, and tall ears form one silhouette.
		ctx.beginPath()
		ctx.moveTo(-0.045, -0.10)
		ctx.lineTo(-0.065, -0.25)
		ctx.lineTo(-0.012, -0.19)
		ctx.quadraticCurveTo(0, -0.20, 0.012, -0.19)
		ctx.lineTo(0.065, -0.25)
		ctx.lineTo(0.045, -0.10)
		ctx.bezierCurveTo(0.085, 0.02, 0.055, 0.14, 0.025, 0.17)
		ctx.lineTo(0, 0.24)
		ctx.lineTo(-0.025, 0.17)
		ctx.bezierCurveTo(-0.055, 0.14, -0.085, 0.02, -0.045, -0.10)
		ctx.fill()
		ctx.restore()
	}

	function animate(time) {
		// Keep flight speed consistent across 30/60/144 Hz browser sources.
		const step = previousTime === undefined ? 1 : Math.min((time - previousTime) / (1000 / 60), 3)
		previousTime = time
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (const bat of bats) {
			bat.x += bat.direction * bat.speed * step
			bat.phase += bat.flapSpeed * step
			bat.drift += 0.018 * step
			if (bat.x < -bat.size * 2 || bat.x > canvas.width + bat.size * 2) {
				Object.assign(bat, createBat(false))
			}
			drawBat(bat)
		}
		requestAnimationFrame(animate)
	}

	window.addEventListener('resize', resize)
	resize()
	requestAnimationFrame(animate)
})()
