const { defineConfig } = require('cypress');

module.exports = defineConfig({
	projectId: '724q9m',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		screenshotsFolder: 'cypress/screenshots',
		chromeWebSecurity: false,
		video: true,
		videosFolder: 'cypress/videos',
		videoCompression: 32,
		encoding: 'vp9',
	},
});
