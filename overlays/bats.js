import { batFrames } from './bat-sprites.js'

// Pixel art and stepped flap animation adapted from Timothy Guo:
// https://codepen.io/timothyguo/pen/jbarzP
;(() => {
	'use strict'

	const overlayConfig = window.OVERLAY_CONFIG

	if (overlayConfig.effect !== 'bats') {
		return
	}

	const config = overlayConfig.bats

	const canvas = document.getElementById('bats')
	const ctx = canvas.getContext('2d')

	// Cache each original 64 x 64 frame once, then draw at whole-pixel scales.
	const palette = { a: config.outlineColor || '#54556b', b: config.color || '#202020', c: config.eyeColor || '#ffffff' }
	const sprites = batFrames.map(rows => {
		const sprite = document.createElement('canvas')
		sprite.width = sprite.height = 64
		const context = sprite.getContext('2d')
		rows.forEach((row, y) => {
			for (let x = 0; x < row.length; x++) {
				if (!palette[row[x]]) continue
				context.fillStyle = palette[row[x]]
				context.fillRect(x, y, 1, 1)
			}
		})
		return sprite
	})
	let previousTime
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
			wingSpeed: random(config.minFlapSpeed, config.maxFlapSpeed)
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

	function update(step) {
		for (const bat of bats) {
			bat.x += bat.speed * bat.direction * step

			bat.bobOffset += bat.bobSpeed * step
			bat.wingOffset += bat.wingSpeed * step

			bat.y += Math.sin(bat.bobOffset) * bat.bobAmount * step

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
		const sprite = sprites[Math.floor((bat.wingOffset % (Math.PI * 2)) / (Math.PI * 2) * sprites.length)]
		const size = Math.max(1, Math.round(bat.size / 64)) * 64
		ctx.save()
		ctx.translate(Math.round(bat.x), Math.round(bat.y))
		ctx.scale(bat.direction, 1)
		ctx.imageSmoothingEnabled = false
		ctx.drawImage(sprite, -size / 2, -size / 2, size, size)
		ctx.restore()
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (const bat of bats) {
			drawBat(bat)
		}
	}

	function animate(time) {
		const step = previousTime === undefined ? 1 : Math.min((time - previousTime) / (1000 / 60), 3)
		previousTime = time
		update(step)
		draw()

		requestAnimationFrame(animate)
	}

	window.addEventListener('resize', () => {
		resize()
		init()
	})

	resize()
	init()
	requestAnimationFrame(animate)
})()
