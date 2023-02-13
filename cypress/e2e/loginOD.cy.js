describe("logging in to Anywhere Staging", () => {
	it("start cycle", () => {
		cy.onDemandLogin().then(() => {
			cy.visit("https://classroom.dev-onlineathome.ondemand.in.th");
		});
	});
});
