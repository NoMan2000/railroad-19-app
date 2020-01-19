const callServer = () => {
  cy.server();
};

export const createMakeRequest = () => {
  callServer();
  cy.route("GET", "/server/**").as("serverRequest");
  cy.visit("/");
  cy.wait("@serverRequest");
};
