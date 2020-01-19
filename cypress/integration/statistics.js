/**
 * Management has asked that the screen offer some high-level/summations/statistics
 * about the current records.
 * They are not interested in charts/graphics (they are minimalists at heart),
 * but want some statistics related to the records in the UI,
 * something that tells the story at a glance.
 * They have given you some discretion in terms of what to show and how to show it,
 * but it should reflect the current dataset.
 **/
import { createMakeRequest } from "../utils/routeUtils";

describe("Show screen offer with statistics", () => {
  beforeEach(() => {
    createMakeRequest();
  });
  describe("Shows off a statistics at a glance", () => {
    it("Will show statistics", () => {
      cy.get("[data-test='statistics']");
      cy.get("[data-test='statistics-status'");
      cy.get("[data-test='statistics-project-owner'");
      cy.get("[data-test='statistics-budget']");
      cy.get("[data-test='statistics-division']");
    });
  });
});
