
describe("Project | Admin Veterinary", () => {
    beforeEach("Precondition:Visit the web site", () => {
      cy.visit("https://administrador-react-j47d.netlify.app/");
    });
  
    it("TC1: Validate the addition of a new appointment when all input fields are filled.", () => {
      cy.fieldFormVeterinary("titan", "Samuel", "11:30", "Dolor de panza");
      cy.get(".cita").should("be.visible");
      cy.validateAppointmentDetails("titan", "Samuel", "11:30", "Dolor de panza");
    });
  
    it("TC2:Validate the successful removal of the new appointment", () => {
      cy.fieldFormVeterinary("titan", "Samuel", "11:30", "Dolor de panza");
      cy.get(".button").click();
      cy.get(".cita").should("not.exist");
    });
    it("TC3:Validate not add new appointment when the input pet its empty", () => {
      cy.fieldFormVeterinary("", "Samuel", "11:30", "Dolor de panza");
      cy.validateFormSubmission();
    });
    it("TC4:Validate not add new appointment when the input Owner its empty", () => {
      cy.fieldFormVeterinary("titan", "", "11:30", "Dolor de panza");
      cy.get(".alerta-error")
        .invoke("text")
        .then((result) => {
          cy.validateFormSubmission();
        });
  
      it("TC5:Validate not add new appointment when the input time its empty", () => {
        cy.fieldFormVeterinary("titan", "pedro", "", "Dolor de panza");
        cy.validateFormSubmission();
      });
  
      it("TC6:Validate not add new appointment when the input symptoms its empty", () => {
        cy.fieldFormVeterinary("titan", "pedro", "09:30", "");
        cy.validateFormSubmission();
      });
    });
  });
  