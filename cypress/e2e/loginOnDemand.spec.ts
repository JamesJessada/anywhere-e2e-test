import { loginOnDemand } from "./Common/User/loginStep";

describe("logging in to Anywhere Staging", () => {
	const onDemandUsers = Cypress.env("USER_OD");
	console.log({ onDemandUsers });
	const { username, password } = onDemandUsers;

	before(() => {
		loginOnDemand(username, password);
	});

	it("should be show snackbar alert success after submit delete exam", () => {
		cy.visit("/");
	});
});
