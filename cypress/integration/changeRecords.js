/**
 Each record needs to allow a user to:
 change the status,
 change the Project Owner,
 and adjust the budget.
 These features should be available in-line without going to another page.
 When a record is changed please provide some sort of feedback to the user.
*/
import { createMakeRequest } from "../utils/routeUtils";

describe("Can Change Records", () => {
  describe("Verify user can change the records", () => {
    beforeEach(() => {
      createMakeRequest();
    });
    it("Can change status", () => {
      cy.get('[data-test="status-0"] .bp3-editable-text-content')
        .should("exist")
        .type("foo");
    });
    it("Can adjust budget", () => {
      cy.get('[data-test="budget-0"] .bp3-editable-text-content')
        .should("exist")
        .type("1");
    });
    it("Can change project owner", () => {
      cy.get('[data-test="project_owner-0"] .bp3-editable-text-content')
        .should("exist")
        .type("foo");
    });
    it("Will show feedback after adjustment", () => {
      cy.get('[data-test="project_owner-0"] .bp3-editable-text-content')
        .should("exist")
        .type("foo{enter}");
      cy.get(".bp3-toast").should("exist");
    });
  });
});
