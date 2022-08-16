describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");

    for (let i = 0; i < 10; i++) {
      cy.get("button").click();
      cy.get("button")
        .get("strong")
        .then(($a) => {
          expect($a.text()).to.equal((i + 1).toString());
        });
    }
  });
});
