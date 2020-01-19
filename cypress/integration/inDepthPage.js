/**
 * Each record needs to supply a link/button/etc to go to a more in-depth page.
 * The link is not active and you don’t need to create the secondary page.
 * This is only to show that each record gives the user the ability to go to another page.
 */
import { createMakeRequest } from "../utils/routeUtils";

describe("Show link/button/etc to go to more in-depth page", () => {
  beforeEach(() => {
    createMakeRequest();
  });
  describe("Link to new page", () => {
    it("Can show new page", () => {
      cy.get('[data-test="showModal-0"]')
        .should("exist")
        .click();
      cy.get('[data-test="edit-main-table-deeper-information"]').should(
        "exist"
      );
    });
  });
});
