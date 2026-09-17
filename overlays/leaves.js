;(() => {
	'use strict'

	const overlayConfig = window.OVERLAY_CONFIG

	// Only run when leaves are enabled
	if (overlayConfig.effect !== 'leaves') {
		return
	}

	const config = overlayConfig.leaves

	const canvas = document.getElementById('leaves')
	const ctx = canvas.getContext('2d')

	let leaves = []

	const colors = config.colors || [
		'#d35400',
		'#e67e22',
		'#f39c12',
		'#c0392b',
		'#8e5a2b',
		'#b8860b'
	]

	function resize() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	function random(min, max) {
		return Math.random() * (max - min) + min
	}

	function createLeaf(startAnywhere = true) {
		return {
			x: random(0, canvas.width),

			y: startAnywhere ? random(0, canvas.height) : random(-100, -20),

			size: random(config.minSize, config.maxSize),

			speed: random(config.minSpeed, config.maxSpeed),

			swaySpeed: random(0.01, 0.03),
			swayAmount: random(20, 60),
			swayOffset: random(0, Math.PI * 2),

			rotation: random(0, Math.PI * 2),
			rotationSpeed: random(-0.04, 0.04),

			color: colors[Math.floor(Math.random() * colors.length)],

			opacity: random(0.6, 1)
		}
	}

	function init() {
		leaves = []

		for (let i = 0; i < config.count; i++) {
			leaves.push(createLeaf())
		}
	}

	function update() {
		for (const leaf of leaves) {
			leaf.y += leaf.speed

			leaf.x += Math.sin(leaf.y * leaf.swaySpeed + leaf.swayOffset) * 0.6

			leaf.rotation += leaf.rotationSpeed

			if (
				leaf.y > canvas.height + 50 ||
				leaf.x < -100 ||
				leaf.x > canvas.width + 100
			) {
				Object.assign(leaf, createLeaf(false))
			}
		}
	}

	function drawLeaf(leaf) {
		ctx.save()

		ctx.translate(leaf.x, leaf.y)
		ctx.rotate(leaf.rotation)

		ctx.globalAlpha = leaf.opacity
		ctx.fillStyle = leaf.color

		// Simple pointed fall-leaf shape
		ctx.beginPath()

		ctx.moveTo(0, -leaf.size)

		ctx.bezierCurveTo(
			leaf.size * 0.8,
			-leaf.size * 0.5,
			leaf.size * 0.8,
			leaf.size * 0.5,
			0,
			leaf.size
		)

		ctx.bezierCurveTo(
			-leaf.size * 0.8,
			leaf.size * 0.5,
			-leaf.size * 0.8,
			-leaf.size * 0.5,
			0,
			-leaf.size
		)

		ctx.fill()

		// Leaf vein/stem
		ctx.globalAlpha = leaf.opacity * 0.6
		ctx.strokeStyle = '#5c3a21'
		ctx.lineWidth = Math.max(1, leaf.size * 0.08)

		ctx.beginPath()
		ctx.moveTo(0, -leaf.size * 0.7)
		ctx.lineTo(0, leaf.size * 1.25)
		ctx.stroke()

		ctx.restore()
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (const leaf of leaves) {
			drawLeaf(leaf)
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
