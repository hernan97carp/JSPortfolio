describe("Project | weather", () => {
    beforeEach("Precondition:Visit the web site", () => {
      cy.visit("https://clima-react-j47d.netlify.app/");
    });
    it("TC1: Validate weather information retrieval for Buenos Aires, Argentina", () => {
      cy.get("#ciudad").click().type("Buenos aires");
      cy.get(".dropdown-trigger").click();
      cy.wait(1000);
      cy.contains("span", "Argentina").should("exist");
  
      cy.contains("span", "Argentina").click();
      cy.get(".waves-button-input").click();
  
      cy.get(".card-panel > .black-text").should("be.visible");
      cy.contains("El clima de");
    });
    it("TC2: Validate not show results when the City input its empty", () => {
      cy.get(".dropdown-trigger").click();
      cy.wait(1000);
      cy.contains("span", "Argentina").should("exist");
  
      cy.contains("span", "Argentina").click();
      cy.get(".waves-button-input").click();
  
      cy.get(".red").should("be.visible");
  
      cy.contains("Ambos campos son obligatorios");
    });
  
    it("TC3: Validate Country with empty data and city input with correct data", () => {
      cy.get("#ciudad").click().type("Buenos aires");
      cy.wait(1000);
      cy.get(".waves-button-input").click();
  
      cy.get(".red").should("be.visible");
  
      cy.contains("Ambos campos son obligatorios");
    });
  
    it("TC4: Should not show results when the data is incorrect", () => {
      cy.get("#ciudad").click().type("a");
      cy.wait(1000);
  
      cy.get(".dropdown-trigger").click();
      cy.wait(1000);
      cy.contains("span", "Colombia").should("exist");
  
      cy.contains("span", "Colombia").click();
  
      cy.get(".waves-button-input").click();
  
      cy.get(".red").should("be.visible");
  
      cy.contains("No hay resultados");
    });
  
    it("TC5 Validate city input with correct data and country input with incorrect data", () => {
      cy.get("#ciudad").click().type("Buenos Aires");
      cy.wait(1000);
  
      cy.get(".dropdown-trigger").click();
      cy.wait(1000);
      cy.contains("span", "Estados Unidos").should("exist");
  
      cy.contains("span", "Estados Unidos").click();
  
      cy.get(".waves-button-input").click();
  
      cy.get(".red").should("be.visible");
  
      cy.contains("No hay resultados");
    });
  });
  
  