;(() => {
	'use strict'

	const config = window.OVERLAY_CONFIG

	console.log('OVERLAY CONFIG:', config)
	console.log('MODE:', config.mode)

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
	if (config.mode === 'rainbow') {
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
	} else if (config.mode === 'fire') {
		spin.style.background = `
      conic-gradient(
        #ff0000,
        #ff6600,
        #ffff00,
        #ff6600,
        #ff0000
      )
    `
	} else if (config.mode === 'ice') {
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
	} else if (config.mode === 'purple') {
		spin.style.background = `
      conic-gradient(
        #ff00ff,
        #8000ff,
        #3300ff,
        #8000ff,
        #ff00ff
      )
    `
	} else if (config.mode === 'main') {
		spin.style.background = `
      conic-gradient(
        90deg,
        #fffd00,
        #ffc400,
        #880000
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
