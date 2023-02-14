import onDemandElements from "../../../fixtures/common/User/OnDemand/element-selectors";

export const loginOnDemand = (username: string, password: string) => {
	Cypress.session.clearAllSavedSessions();

	const authenticationUrl = Cypress.env("URL_LOGIN_OD");
	const {
		userPortalNavigationButton,
		usernameInput,
		passwordInput,
		loginButton,
	} = onDemandElements;

	cy.session(`username:${username}`, () => {
		cy.visit("/");
		cy.on("uncaught:exception", () => false);
		cy.get(userPortalNavigationButton.selector).click();
		cy.origin(
			authenticationUrl,
			{
				args: {
					usernameInput,
					passwordInput,
					loginButton,
					username,
					password,
				},
			},
			({ usernameInput, passwordInput, loginButton, username, password }) => {
				cy.get(usernameInput.selector).type(username);
				cy.get(passwordInput.selector).type(password);
				cy.get(loginButton.selector).click();
			}
		);
	});
};
