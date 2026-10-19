// Inspired by Toby J's Pure CSS Christmas Lights:
// https://codepen.io/tobyj/pen/QjvEex
;(() => {
	'use strict'
	if (window.OVERLAY_CONFIG.effect !== 'xmas-lights') return

	const config = window.OVERLAY_CONFIG['xmas-lights']
	const ns = 'http://www.w3.org/2000/svg'
	const svg = document.createElementNS(ns, 'svg')
	svg.id = 'xmas-lights'
	svg.setAttribute('aria-hidden', 'true')
	svg.classList.toggle('is-steady', !config.twinkle)
	document.body.appendChild(svg)

	function element(name, attributes, parent = svg) {
		const node = document.createElementNS(ns, name)
		for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value)
		parent.appendChild(node)
		return node
	}

	function resize() {
		const width = window.innerWidth
		const height = window.innerHeight
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
		svg.replaceChildren()
		const inset = Math.min(Math.max(4, config.inset), width / 4, height / 4)
		const w = width - inset * 2
		const h = height - inset * 2
		const spacing = Math.max(20, config.spacing)
		const bulbWidth = Math.max(2, config.bulbWidth)
		const bulbHeight = Math.max(4, config.bulbHeight)
		let index = 0

		// Clockwise local coordinates keep every bulb pointing into the frame.
		const edges = [
			[inset, inset, w, 0],
			[width - inset, inset, h, 90],
			[width - inset, height - inset, w, 180],
			[inset, height - inset, h, 270]
		]
		for (const [x, y, length, angle] of edges) {
			const edge = element('g', { transform: `translate(${x} ${y}) rotate(${angle})` })
			const count = Math.max(1, Math.round(length / spacing))
			const gap = length / count
			// Half-gap at each end leaves room for bulbs at the corners.
			let wire = `M 0 0 Q ${gap / 4} 5 ${gap / 2} 0`
			for (let i = 0; i < count - 1; i++) {
				const start = (i + 0.5) * gap
				wire += ` Q ${start + gap / 2} 12 ${start + gap} 0`
			}
			wire += ` Q ${length - gap / 4} 5 ${length} 0`
			element('path', { d: wire, class: 'xmas-wire' }, edge)
			for (let i = 0; i < count; i++, index++) {
				const bulb = element('g', { transform: `translate(${(i + 0.5) * gap} 0)` }, edge)
				const colors = config.colors.length ? config.colors : ['#00f7a5', '#00ffff', '#f70094']
				const color = colors[index % colors.length]
				const duration = [2, 1.4, 1.1, 1.8][index % 4]
				const lamp = element('g', {
					class: 'xmas-lamp',
					style: `color:${color};animation-duration:${duration}s;animation-delay:-${(index * 0.37) % duration}s`
				}, bulb)
				element('ellipse', { cx: 0, cy: bulbHeight / 2 + 3, rx: bulbWidth / 2, ry: bulbHeight / 2, fill: 'currentColor' }, lamp)
				element('ellipse', { cx: -bulbWidth * 0.15, cy: bulbHeight * 0.36 + 3, rx: bulbWidth * 0.12, ry: bulbHeight * 0.2, fill: '#fff', opacity: 0.65 }, lamp)
				element('rect', { x: -bulbWidth / 2 + 1, y: -3, width: bulbWidth - 2, height: 8, rx: 2, fill: '#222' }, bulb)
			}
		}
	}

	window.addEventListener('resize', resize)
	resize()
})()
