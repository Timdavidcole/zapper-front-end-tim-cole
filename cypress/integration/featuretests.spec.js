/// <reference types="cypress" />

context("Features", () => {
  beforeEach(() => {
    cy.visit("./index.html");
  });

  it("should load the page", () => {
    cy.get(".members-add-container").should("contain.text", "Members");
    cy.get(".add-member-button").should("not.be.disabled");

    cy.get(".table-header-row").should("include.text", "Team member");
    cy.get(".member-row").should("include.text", "Erica Badu");
    cy.get(".member-row").should("include.text", "o.hunter@example.com");

    cy.get(".members-active").should("include.text", "5/6 active members");
    cy.get(".invite-button").should("not.be.disabled");
  });

  it("should hide and show delete button on hover, then delete element", () => {
    cy.get(".delete-button").should("be.hidden");
    cy.get(".member-row")
      .first()
      .within(() => {
        cy.get(".delete-button").click({ force: true });
      });
    cy.get(".member-row").should("not.contain.text", "Erica Badu");
  });

  it("adds a new random member when red add member button pressed", () => {
    cy.get(".add-member-button").click();
    cy.get(".member-row").should("have.length", 7);
    cy.get(".member-row")
      .last()
      .should("include.text", "Pending acceptance");
  });
  it("adds a new random member when the invite member button pressed", () => {
    cy.get(".invite-button").click();
    cy.get(".member-row").should("have.length", 7);
    cy.get(".member-row")
      .last()
      .should("include.text", "Pending acceptance");
  });

  it("displays how many active and total members there are", () => {
    cy.get(".members-active").should("include.text", "5/6 active members");
    cy.get(".member-row")
      .first()
      .within(() => {
        cy.get(".delete-button").click({ force: true });
      });
      cy.get(".members-active").should("include.text", "4/5 active members");
    });
});
