/**
 * Please provide inactive/placeholder (non-working) UI elements for Users to:
 add a new record
 export the records on screen to Excel or PDF
 **/
import { createMakeRequest } from "../utils/routeUtils";

describe("Can add new record", () => {
  beforeEach(() => {
    createMakeRequest();
  });
  it("It can make new records", () => {
    cy.get('[data-test="add-new-record"]')
      .first()
      .click({ force: true });
    cy.get('[data-test="add-main-table"]').should("exist");
    cy.get('[data-test="add-main-table-cancel"]')
      .first()
      .click();
  });
  it("Can export to excel", () => {
    cy.get('[data-test="download-csv"]')
      .first()
      .click({ force: true });
  });
  it("Can export to PDF", () => {
    cy.get('[data-test="download-pdf"]')
      .first()
      .click({ force: true });
  });
});
