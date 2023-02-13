import ondemandElements from "../fixtures/common/User/Ondemand/element-selectors";

const userPortalUrl = Cypress.env("user_portal_url");
const { ondemand: ondemandUserPortalUrl, session_name: sessionName } =
	userPortalUrl;

Cypress.Commands.add("ondemandLogin", () => {
	Cypress.session.clearAllSavedSessions();
	const {
		userPortalNavigationButton,
		usernameInput,
		passwordInput,
		loginButton,
	} = ondemandElements;
	console.log(usernameInput);

	// ! todo: find the way to pass selector into session()

	cy.session(
		`username:${sessionName}`,
		() => {
			cy.visit(Cypress.env("base_url"));
			// ! avoid test failure from CORB
			cy.on("uncaught:exception", () => false);
			cy.get(userPortalNavigationButton.selector).click();

			// ! To interact with cross origin contents
			cy.origin(
				ondemandUserPortalUrl,
				{ args: { usernameInput } },
				({ usernameInput }) => {
					cy.url().should("include", "/user-portal");
					cy.get(usernameInput.selector).type("10000088");
					cy.get("#password").type("787288");
					cy.get("#signin").click();
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
