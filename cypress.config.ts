const { defineConfig } = require("cypress");

module.exports = defineConfig({
	viewportWidth: 800,
	viewportHeight: 500,
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: "https://classroom.dev-onlineathome.ondemand.in.th",
	},
});
