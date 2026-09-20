const params = new URLSearchParams(window.location.search)

window.OVERLAY_CONFIG = {
	width: 1920,
	height: 1080,

	// "rainbow" or "custom"
	frame: params.get('frame') || 'main',
	effect: params.get('effect') || 'bats',

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
		count: 30,

		minSize: 40,
		maxSize: 80,

		minSpeed: 1,
		maxSpeed: 3,

		minFlapSpeed: 0.08,
		maxFlapSpeed: 0.18,

		color: '#050505'
	}
}
