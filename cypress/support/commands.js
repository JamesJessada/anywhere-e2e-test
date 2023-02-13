import onDemandElements from "../fixtures/common/User/Ondemand/element-selectors";

const ENV_DATA = Cypress.env();
console.log({ ENV_DATA });
const { userPortalUrl } = ENV_DATA;
const { users } = ENV_DATA;
const { onDemand: onDemandUsers, learn: learnUsers } = users;

Cypress.Commands.add("onDemandLogin", () => {
	Cypress.session.clearAllSavedSessions();
	const {
		userPortalNavigationButton,
		usernameInput,
		passwordInput,
		loginButton,
	} = onDemandElements;

	const { name, username, password } = onDemandUsers[0];

	console.log({ onDemandUsers });

	cy.session(
		`username:${name}`,
		() => {
			cy.visit(Cypress.env("baseUrl"));
			// ! avoid test failure from CORB
			cy.on("uncaught:exception", () => false);
			cy.get(userPortalNavigationButton.selector).click();
			// ! To interact with cross origin contents
			cy.origin(
				userPortalUrl.onDemand,
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
					cy.url().should("include", "/user-portal");
					cy.get(usernameInput.selector).type(username);
					cy.get(passwordInput.selector).type(password);
					cy.get(loginButton.selector).click();
				}
			);
		},
		{
			// validate: () => {
			// 	cy.getCookie("your-session-cookie").should("exist");
			// },
		}
	);
});
