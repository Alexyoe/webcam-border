;(() => {
	'use strict'
	if (window.OVERLAY_CONFIG.effect !== 'halloween-lights') return

	const config = window.OVERLAY_CONFIG['halloween-lights']
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	svg.id = 'halloween-lights'
	svg.setAttribute('aria-hidden', 'true')
	svg.classList.toggle('is-steady', !config.twinkle)
	svg.style.setProperty('--wire-color', config.wireColor || '#222')
	document.body.appendChild(svg)

	function element(name, attributes, parent = svg) {
		const node = document.createElementNS(svg.namespaceURI, name)
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
		let index = 0
		// Rotate each edge so the pumpkins point into the frame, like the Christmas lights.
		for (const [x, y, length, angle] of [
			[inset, inset, w, 0],
			[width - inset, inset, h, 90],
			[width - inset, height - inset, w, 180],
			[inset, height - inset, h, 270]
		]) {
			const edge = element('g', { transform: `translate(${x} ${y}) rotate(${angle})` })
			const count = Math.max(1, Math.round(length / spacing))
			const gap = length / count
			let wire = `M 0 0 Q ${gap / 4} 5 ${gap / 2} 0`
			for (let i = 0; i < count - 1; i++) {
				const start = (i + 0.5) * gap
				wire += ` Q ${start + gap / 2} 12 ${start + gap} 0`
			}
			wire += ` Q ${length - gap / 4} 5 ${length} 0`
			element('path', { d: wire, class: 'halloween-wire' }, edge)
			for (let i = 0; i < count; i++, index++) {
				const color = index % 2 ? (config.secondColor || config.color) : config.color
				const faceColor = index % 2 ? (config.secondFaceColor || config.faceColor) : config.faceColor
				const bulb = element('g', {
					transform: `translate(${(i + 0.5) * gap} 0) scale(${Math.max(4, config.bulbWidth) / 32} ${Math.max(4, config.bulbHeight) / 26})`
				}, edge)
				element('path', { d: 'M -3 -3 L 3 -3 L 4 8 L -4 8 Z', fill: config.holderColor || '#344321', stroke: config.holderOutlineColor || '#1d2916', 'stroke-width': 1 }, bulb)
				const duration = [2.8, 3.4, 2.3, 3.1][index % 4]
				const lamp = element('g', {
					class: 'halloween-lamp',
					style: `color:${color};animation-duration:${duration}s;animation-delay:-${(index * 0.37) % duration}s`
				}, bulb)
				// Overlapping lobes keep the silhouette round and readable at small sizes.
				element('ellipse', { cx: -7, cy: 19, rx: 9, ry: 12, fill: 'currentColor' }, lamp)
				element('ellipse', { cx: 7, cy: 19, rx: 9, ry: 12, fill: 'currentColor' }, lamp)
				element('ellipse', { cx: 0, cy: 19, rx: 9, ry: 13, fill: 'currentColor' }, lamp)
				element('path', { d: 'M -7 8 Q -12 19 -7 30 M 7 8 Q 12 19 7 30', fill: 'none', stroke: '#a84400', 'stroke-opacity': 0.45, 'stroke-width': 1.2 }, lamp)
				element('path', { d: 'M -10 18 L -6 12 L -3 18 Z M 3 18 L 6 12 L 10 18 Z M -10 22 L -5 24 L -5 22 L -1 22 L -1 25 L 3 25 L 3 22 L 7 22 L 7 23 L 10 21 Q 7 31 0 29 Q -7 29 -10 22 Z', fill: faceColor, class: 'halloween-face', style: `filter:drop-shadow(0 0 2px ${faceColor})` }, lamp)
			}
		}
	}

	window.addEventListener('resize', resize)
	resize()
})()
