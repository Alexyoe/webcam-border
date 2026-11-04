;(() => {
	'use strict'
	if (!window.OVERLAY_CONFIG.effects.includes('autumn-lights')) return

	const config = window.OVERLAY_CONFIG['autumn-lights']
	const ns = 'http://www.w3.org/2000/svg'
	const svg = document.createElementNS(ns, 'svg')
	svg.id = 'autumn-lights'
	svg.setAttribute('aria-hidden', 'true')
	svg.classList.toggle('is-steady', !config.twinkle)
	svg.style.setProperty('--wire-color', config.wireColor || '#222')
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
		const spacing = Math.max(40, config.spacing, config.bulbWidth * 1.5)
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
		for (const [x, y, length, angle] of config.sides === 'top' ? edges.slice(0, 1) : edges) {
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
			element('path', { d: wire, class: 'autumn-wire' }, edge)
			for (let i = 0; i < count; i++, index++) {
				const bulb = element('g', { transform: `translate(${(i + 0.5) * gap} 0)` }, edge)
				const colors = config.colors.length ? config.colors : ['#e87924', '#eebc38', '#c94b32', '#b98532']
				const color = colors[index % colors.length]
				const duration = [2, 1.4, 1.1, 1.8][index % 4]
				const lamp = element('g', {
					class: 'autumn-lamp',
					style: `color:${color};animation-duration:${duration}s;animation-delay:-${(index * 0.37) % duration}s`
				}, bulb)
				const leaf = element('g', { transform: `translate(0 5) scale(${bulbWidth / 32} ${bulbHeight / 38})` }, lamp)
				element('path', { d: 'M 0 0 L 4 10 L 11 6 L 10 15 L 16 14 L 12 23 L 15 25 L 5 29 L 0 38 L -5 29 L -15 25 L -12 23 L -16 14 L -10 15 L -11 6 L -4 10 Z', fill: 'currentColor' }, leaf)
				element('path', { d: 'M 0 1 L 0 32 M 0 16 L -7 11 M 0 16 L 7 11 M 0 24 L -11 19 M 0 24 L 11 19', fill: 'none', stroke: config.veinColor || '#79401f', 'stroke-width': 1.1, 'stroke-linecap': 'round', opacity: 0.65 }, leaf)
				element('rect', { x: -3, y: -3, width: 6, height: 10, rx: 2, fill: config.holderColor || '#6b492b' }, bulb)
			}
		}
	}

	window.addEventListener('resize', resize)
	resize()
})()

