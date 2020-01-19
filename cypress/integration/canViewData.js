/**
 Users will probably need to be able to see their data.
 */
import { createMakeRequest } from "../utils/routeUtils";

describe("Can See The Page", () => {
  describe("A user can see the Page Dashboard", () => {
    beforeEach(() => {
      createMakeRequest();
    });
    it("Can see the data on a page", () => {
      cy.visit("/");
      cy.get("[data-test='project-name']").should("exist");
    });
  });
});
