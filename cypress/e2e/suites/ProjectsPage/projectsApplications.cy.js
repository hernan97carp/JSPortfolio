//The reason why we test projects and applications in a single file(projects Applications) is due to
// time constraints. 
//Typically, there would be one file for each System Under Test (SUT).

describe("Project | Conversion | Cryptocurrency ", () => {
  beforeEach("Precondition:Visit the web site", () => {
    cy.visit("https://cripto-react-j47d.netlify.app/");
  });
  it("TC1:Should validate the conversion of a currency to cryptocurrency", () => {
    // Agregar una espera explícita antes de interactuar con elementos en la nueva página
    cy.get("select.css-1mieyla").eq(0).select("Dolar de EEUU", { force: true });
    cy.get("select.css-1mieyla").eq(1).select("Bitcoin", { force: true });

    cy.get(".css-g4c8iy").click();
    cy.get(".css-rigok7").invoke("text").should("contain", "El precio es: $");
    // Otras acciones o aserciones en la nueva página
  });

  it("TC2:Validate the absence of conversion when the required inputs are not selected.", () => {
    // Agregar una espera explícita antes de interactuar con elementos en la nueva página
    cy.get("select.css-1mieyla").eq(0).select("-Seleccione-", { force: true });
    cy.get("select.css-1mieyla").eq(1).select("-Seleccione-", { force: true });

    cy.get(".css-g4c8iy").click();

    cy.contains("Ambos campos son obligatorios");
  });
  it("TC3: Should not show results when cryptocurrency input is filled, but currency input is empty", () => {
    // Agregar una espera explícita antes de interactuar con elementos en la nueva página
    cy.get("select.css-1mieyla").eq(0).select("-Seleccione-", { force: true });
    cy.get("select.css-1mieyla").eq(1).select("Bitcoin", { force: true });

    cy.get(".css-g4c8iy").click();

    cy.contains("Ambos campos son obligatorios");
  });

  it("TC4: Should not show results when cryptocurrency input is empty, but currency input is filled", () => {
    cy.get("select.css-1mieyla").eq(0).select("Euro", { force: true });
    cy.get("select.css-1mieyla").eq(1).select("-Seleccione-", { force: true });

    cy.get(".css-g4c8iy").click();

    cy.contains("Ambos campos son obligatorios");
  });
});

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

describe("Project | Budget control", () => {
  beforeEach("Precondition:Visit the web site", () => {
    cy.visit("https://controlpresupuesto-react-j47d.netlify.app/");
  });
  it("TC1:Validates not entering the budget control when the budget is not filled", () => {
    cy.contains("Presupuesto");
    cy.get(".button-primary").click();

    cy.get(".alert").contains("El Presupuesto es Incorrecto");
    cy.should("not.contain", "Gasto Semanal");
  });

  it("TC2: Validates the deduction of transportation expenses from my budget", () => {
    cy.contains("Presupuesto");
    cy.get('[type="number"]').type("400000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Transportation");
    cy.get(":nth-child(3) > .u-full-width").click().type("40000");
    cy.get(".button-primary").click();
    cy.get(".alert-success");
    cy.get("p").contains("Transportation");
  });

  it("TC3: Validates that my budget becomes negative if my expenses exceed it.", () => {
    cy.contains("Presupuesto");
    cy.get('[type="number"]').type("400000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Transportation");
    cy.get(":nth-child(3) > .u-full-width").click().type("500000");
    cy.get(".button-primary").click();
    cy.get(".alert-danger").should("be.visible");
    cy.get("p").contains("Transportation");
  });

  it("TC4: Validates the deduction of transportation expenses from my budget when there are three expenses..", () => {
    cy.contains("Presupuesto");
    cy.get('[type="number"]').type("400000");
    cy.get(".button-primary").click();
    cy.get(":nth-child(2) > .u-full-width").click().type("Transportation");
    cy.get(":nth-child(3) > .u-full-width").click().type("40000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Food");
    cy.get(":nth-child(3) > .u-full-width").click().type("50000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Taxes");
    cy.get(":nth-child(3) > .u-full-width").click().type("60000");
    cy.get(".button-primary").click();

    cy.get(".alert-success").should("be.visible");
    cy.get("p").contains("Transportation");
    cy.get("p").contains("Food");
    cy.get("p").contains("Taxes");
  });

  it("TC5: Validates that my budget becomes negative when there are three significant expenses.", () => {
    cy.contains("Presupuesto");
    cy.get('[type="number"]').type("400000");
    cy.get(".button-primary").click();
    cy.get(":nth-child(2) > .u-full-width").click().type("Transportation");
    cy.get(":nth-child(3) > .u-full-width").click().type("440000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Food");
    cy.get(":nth-child(3) > .u-full-width").click().type("100000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Taxes");
    cy.get(":nth-child(3) > .u-full-width").click().type("220000");
    cy.get(".button-primary").click();

    cy.get(".alert-danger").should("be.visible");
    cy.get("p").contains("Transportation");
    cy.get("p").contains("Food");
    cy.get("p").contains("Taxes");
    cy.get(".alert-danger")
      .invoke("text")
      .then((result) => {
        expect(result).to.include("-");
      });
  });

  it("TC6: Validate that a result is not calculated when the expense input is empty but the expense amount is filled.", () => {
    cy.contains("Presupuesto");
    cy.get('[type="number"]').type("400000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(3) > .u-full-width").click().type("440000");
    cy.get(".button-primary").click();
    cy.get("form > .alert").should(
      "contain",
      "Ambos campos son obligatorios o Presupuesto incorrecto"
    );
  });
  it("TC7: Validate that a result is not calculated when the expense input is filled but the expense amount is empty.", () => {
    cy.contains("Presupuesto");
    cy.get('[type="number"]').type("400000");
    cy.get(".button-primary").click();

    cy.get(":nth-child(2) > .u-full-width").click().type("Transportation");
    cy.get(".button-primary").click();
    cy.get("form > .alert").should(
      "contain",
      "Ambos campos son obligatorios o Presupuesto incorrecto"
    );
    cy.get("p").should("not.contain", "Transportation");
  });
});

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
