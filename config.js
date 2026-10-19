const params = new URLSearchParams(window.location.search)

window.OVERLAY_CONFIG = {
	width: 1920,
	height: 1080,

	// "rainbow" or "custom"
	frame: params.get('frame') || 'main',
	effect: params.get('effect') || 'none',

	// Used when mode is "custom"
	firstColor: '#fffd00',
	secondColor: '#ffc400',
	thirdColor: '#880000',

	// Speed of rotation
	durationSeconds: 15,

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

	'xmas-lights': {
		spacing: 104,
		bulbWidth: 16,
		bulbHeight: 32,
		inset: 10,
		colors: ['#00f7a5', '#00ffff', '#f70094'],
		twinkle: true
	},

	// Select with ?effect=bats2 (sizes are full wingspan in pixels).
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
	}
}
