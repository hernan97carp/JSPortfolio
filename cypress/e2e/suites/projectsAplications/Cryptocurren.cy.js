

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

