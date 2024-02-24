describe("Project | insurance quote generator", () => {
    beforeEach("Precondition:Visit the web site", () => {
      cy.visit("https://cotizador-react-j47d.netlify.app//");
    });
  
    it("TC1: Validate the accurate calculation of the correct insurance when all fields are filled out", () => {
      cy.get(":nth-child(1) > .css-ajjmmw").select("Americano");
      cy.get(":nth-child(2) > .css-ajjmmw").select("2021");
      cy.get('[value="basico"]').click();
      cy.get(".css-1cro71e").click();
  
      cy.inputFieldsOptions("Americano", "2021", "basico");
  
      cy.validationFormInsurance(
        "Marca: Americano",
        "Plan: Basico",
        "Año del auto: 2021"
      );
    });
  
    it("TC2: Validate the accurate calculation when the Complete button is pressed with all input fields filled.", () => {
      cy.inputFieldsOptions("Americano", "2021", "completo");
      cy.validationFormInsurance(
        "Marca: Americano",
        "Plan: Completo",
        "Año del auto: 2021"
      );
    });
  
    it("TC3: Validate not calculated when the input model its empty", () => {
      cy.inputFieldsOptions("-- Seleccione --", "2021", "basico");
      cy.get(".css-1e1j9w1 > p")
        .should("exist")
        .should("contain", "Todos los campos son obligatorios");
    });
    it("TC4: Validate not calculated when the input year its empty", () => {
      cy.inputFieldsOptions("Europeo", "-- Seleccione --", "basico");
      cy.get(".css-1e1j9w1 > p")
        .should("exist")
        .should("contain", "Todos los campos son obligatorios");
    });
  
    it("TC5: Validate not calculated when the input plan its empty", () => {
      cy.inputFieldsOptions("Europeo", "2021", "");
      cy.get(".css-1e1j9w1 > p")
        .should("exist")
        .should("contain", "Todos los campos son obligatorios");
    });
  
    it("TC6: Validate that the calculation is not performed when the input year is filled out, but the other fields are not.", () => {
      cy.inputFieldsOptions("", "2021", "");
      cy.get(".css-1e1j9w1 > p")
        .should("exist")
        .should("contain", "Todos los campos son obligatorios");
    });
  
    it("TC7: Validate that the calculation is not performed when the input year is empty, but the other fields are completed.", () => {
      cy.inputFieldsOptions("Asiatico", "", "completo");
      cy.get(".css-1e1j9w1 > p")
        .should("exist")
        .should("contain", "Todos los campos son obligatorios");
    });
  });