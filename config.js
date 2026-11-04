const params = new URLSearchParams(window.location.search)

window.OVERLAY_CONFIG = {
	// Browser source dimensions in pixels.
	width: 1920,
	height: 1080,

	// Frame: none, main, rainbow, fire, halloween, ice, purple, chase, win98, custom.
	frame: params.get('frame') || 'main',
	// Comma-separated effects, e.g. 'snow,xmas-lights'. URL overrides this value.
	effect: params.get('effect') ?? 'none',

	// Custom frame colors and rotation speed (seconds).
	firstColor: '#fffd00',
	secondColor: '#ffc400',
	thirdColor: '#880000',

	durationSeconds: 15,

	// Windows 98 frame sizes are in pixels.
	win98: {
		title: 'The Yoedog Show - Live!',
		borderWidth: 16,
		titleBarHeight: 52,
		fontSize: 64,
		buttonSize: 44, // Button height
		buttonWidth: 48,
		gradientStart: '#000080',
		gradientEnd: '#1084d0'
	},

	// Animated effects: sizes in pixels, speeds per animation frame.
	snow: {
		flakes: 200,
		minSize: 1,
		maxSize: 8,
		minSpeed: 0.5,
		maxSpeed: 3,
		drift: 0.8
	},

	leaves: {
		count: 60,
		minSize: 8,
		maxSize: 22,
		minSpeed: 0.5,
		maxSpeed: 3,
		colors: ['#d35400', '#e67e22', '#f39c12', '#c0392b', '#8e5a2b', '#b8860b']
	},

	bats: {
		count: 15,
		// Full sprite size, rounded to multiples of 64 for crisp pixels.
		minSize: 128,
		maxSize: 192,
		minSpeed: 2,
		maxSpeed: 5,
		minFlapSpeed: 0.15,
		maxFlapSpeed: 0.22,
		color: '#202020',
		outlineColor: '#6b6154',
		eyeColor: '#ffffff'
	},

	// Smooth bats; sizes are the full wingspan in pixels.
	bats2: {
		count: 24,
		minSize: 65,
		maxSize: 130,
		minSpeed: 1.2,
		maxSpeed: 3.2,
		minFlapSpeed: 0.09,
		maxFlapSpeed: 0.16,
		color: '#100e18',
		membraneColor: '#272131',
		ribColor: '#494050'
	},

	// Light strings: spacing, bulb dimensions, and inset are in pixels.
	'xmas-lights': {
		sides: 'top', // 'all' or 'top'
		wireColor: '#222222',
		holderColor: '#222222',
		spacing: 104,
		bulbWidth: 16,
		bulbHeight: 32,
		inset: 5,
		colors: ['#f70000', '#0fcc28', '#ffff'],
		twinkle: true
	},

	'halloween-lights': {
		sides: 'all', // 'all' or 'top'
		wireColor: '#222222',
		holderColor: '#344321',
		holderOutlineColor: '#1d2916',
		spacing: 104,
		bulbWidth: 32,
		bulbHeight: 26,
		inset: 7,
		color: '#ff7900',
		faceColor: '#fff36a',
		// Alternate pumpkins use this second body/face pair.
		secondColor: '#3daa34',
		secondFaceColor: '#aaff66',
		twinkle: true
	},

	'autumn-lights': {
		sides: 'top', // 'all' or 'top'
		wireColor: '#493322',
		holderColor: '#6b492b',
		spacing: 104,
		bulbWidth: 32,
		bulbHeight: 38,
		inset: 7,
		colors: ['#e87924', '#eebc38', '#c94b32', '#b98532'],
		veinColor: '#79401f',
		twinkle: true
	}
}

// Build the active effect list from the comma-separated selection above.
window.OVERLAY_CONFIG.effects = [
	...new Set(
		window.OVERLAY_CONFIG.effect
			.split(',')
			.map(effect => effect.trim())
			.filter(effect => effect && effect !== 'none')
	)
]
