window.OVERLAY_CONFIG = {
	width: 1920,
	height: 1080,

	// "rainbow" or "custom"
	mode: 'main',

	// Used when mode is "custom"
	firstColor: '#fffd00',
	secondColor: '#ffc400',
	thirdColor: '#880000',

	// Speed of rotation
	durationSeconds: 15,

	// Other effects
	effect: 'leaves',

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
	}
}
