describe("logging in to Anywhere Staging", () => {
	it("start cycle", () => {
		cy.ondemandLogin().then(() => {
			cy.visit("https://classroom.dev-onlineathome.ondemand.in.th");
		});
	});
});
