;(() => {
	'use strict'

	const config = window.OVERLAY_CONFIG
	if (config.frame === 'none') {
		document.getElementById('frame').style.display = 'none'
		return
	}
	if (config.frame === 'win98') {
		const frame = document.getElementById('frame')
		frame.classList.add('win98-frame')
		for (const [property, value, fallback, minimum] of [
			['--win98-border', config.win98.borderWidth, 8, 2],
			['--win98-title-height', config.win98.titleBarHeight, 32, 16],
			['--win98-font-size', config.win98.fontSize, 16, 8],
			['--win98-button-size', config.win98.buttonSize, 22, 12],
			['--win98-button-width', config.win98.buttonWidth ?? config.win98.buttonSize, 22, 12]
		]) {
			frame.style.setProperty(property, `${Math.max(minimum, Number.isFinite(value) ? value : fallback)}px`)
		}
		frame.style.setProperty('--win98-gradient-start', config.win98.gradientStart || '#000080')
		frame.style.setProperty('--win98-gradient-end', config.win98.gradientEnd || '#1084d0')
		frame.replaceChildren()
		const titlebar = document.createElement('div')
		titlebar.className = 'win98-titlebar'
		const icon = document.createElement('span')
		icon.className = 'win98-icon'
		icon.setAttribute('aria-hidden', 'true')
		const title = document.createElement('span')
		title.className = 'win98-title'
		title.textContent = config.win98.title
		const controls = document.createElement('div')
		controls.className = 'win98-controls'
		for (const name of ['minimize', 'maximize', 'close']) {
			const button = document.createElement('span')
			button.className = `win98-button win98-${name}`
			controls.appendChild(button)
		}
		titlebar.append(icon, title, controls)
		frame.appendChild(titlebar)
		return
	}

	const root = document.documentElement
	const spin = document.getElementById('spin')

	const spinSize = Math.round(Math.hypot(config.width, config.height)) + 5

	root.style.setProperty('--frame-width', `${config.width}px`)
	root.style.setProperty('--frame-height', `${config.height}px`)
	root.style.setProperty('--first-color', config.firstColor)
	root.style.setProperty('--second-color', config.secondColor)
	root.style.setProperty('--third-color', config.thirdColor)
	root.style.setProperty('--spin-duration', `${config.durationSeconds}s`)

	// Set color mode
	if (config.frame === 'rainbow') {
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
    `
	} else if (config.frame === 'fire') {
		spin.style.background = `
      conic-gradient(
        #ff0000,
        #ff6600,
        #ffff00,
        #ff6600,
        #ff0000
      )
    `
	} else if (config.frame === 'halloween') {
		spin.style.background = `
      conic-gradient(
        from 0deg,
        #080404,
        #880000,
        #ff3300,
        #ff7900,
        #080404,
        #880000,
        #ff3300,
        #ff7900,
        #080404
      )
    `
	} else if (config.frame === 'ice') {
		spin.style.background = `
      conic-gradient(
        #001aff,
        #00aaff,
        #00ffff,
        #ffffff,
        #00ffff,
        #001aff
      )
    `
	} else if (config.frame === 'purple') {
		spin.style.background = `
      conic-gradient(
        #ff00ff,
        #8000ff,
        #3300ff,
        #8000ff,
        #ff00ff
      )
    `
	} else if (config.frame === 'main') {
		spin.style.background = `
      conic-gradient(
        90deg,
        #fffd00,
        #ffc400,
        #880000
      )
    `
	} else if (config.frame === 'chase') {
		spin.style.background = `
      conic-gradient(
        from 0deg,
  
        transparent 0deg,
        transparent 285deg,
  
        ${config.firstColor}22 295deg,
        ${config.firstColor}55 305deg,
        ${config.firstColor}99 315deg,
        ${config.secondColor} 330deg,
        ${config.thirdColor} 342deg,
        #ffffff 350deg,
  
        transparent 355deg,
        transparent 360deg
      )
    `
	} else {
		// Custom colors from config.js
		spin.style.background = `
      linear-gradient(
        90deg,
        ${config.firstColor} 0%,
        ${config.secondColor} 50%,
        ${config.thirdColor} 85%
      )
    `
	}

	Object.assign(spin.style, {
		width: `${spinSize}px`,
		height: `${spinSize}px`,
		marginLeft: `${-(spinSize - config.width) / 2}px`,
		marginTop: `${-(spinSize - config.height) / 2}px`
	})
})()
