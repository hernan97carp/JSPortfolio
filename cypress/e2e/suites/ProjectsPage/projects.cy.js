describe("This is a section about the projects make it", () => {
  beforeEach(() => {
    cy.visit("https://juliandesign.vercel.app/projects");
  });

  it("TC1: Validate the text of Presentation", () => {
    cy.get(
      "h1.font-Chakra.font-semibold.uppercase.text-white.text-left.sm\\:text-right"
    )
      .invoke("text")
      .should("include", "¡Hola!Soy Julian");

    cy.get("h2.font-Chakra.font-semibold.uppercase.textShadow")
      .invoke("text")
      .should("include", "Frontend Developer & Web Designer");
  });

  it("TC2:Validate carrasuel if this works when click in the arrow right", () => {
    cy.sliderTourToRight();
  });

  it("TC3:Validate carrasuel if this works when click in the arrow left", () => {
    cy.sliderTourToLeft();
  });
  it("TC4: Two clicks and the right one in the left", () => {
    cy.twoClicksRightsOneLeft("CriptoCotizador", "Clima", "Wallet");
    cy.twoClicksRightsOneLeft("Clima", "Wallet", "Cotizador de Seguros");
    cy.twoClicksRightsOneLeft(
      "Wallet",
      "Cotizador de Seguros",
      "Admin. de Veterinaria"
    );
    cy.twoClicksRightsOneLeft(
      "Cotizador de Seguros",
      "Admin. de Veterinaria",
      "CriptoCotizador"
    );
    cy.twoClicksRightsOneLeft(
      "Admin. de Veterinaria",
      "CriptoCotizador",
      "Clima"
    );
  });

  it("TC5: Two clicks and the left one in the right", () => {
    cy.twoClicksLeftOneRight(
      "CriptoCotizador",
      "Admin. de Veterinaria",
      "Cotizador de Seguros"
    );
    cy.twoClicksLeftOneRight(
      "Admin. de Veterinaria",
      "Cotizador de Seguros",
      "Wallet"
    );
    cy.twoClicksLeftOneRight("Cotizador de Seguros", "Wallet", "Clima");
    cy.twoClicksLeftOneRight("Wallet", "Clima", "CriptoCotizador");
    cy.twoClicksLeftOneRight(
      "Clima",
      "CriptoCotizador",
      "Admin. de Veterinaria"
    );
  });

  it("TC6:Validate the elements of the footer", () => {
    //This site was create with:
    cy.get("p.footer_p.text-white.font-Chakra.font-normal.text-xs.m-0.pr-2")
      .invoke("text")
      .should("contains", "Este sitio fue desarrolado con:");
    //images
    cy.get('img[src="/images/framer.svg"]').should("exist");
    cy.get('img[src="/images/next.png"]').should("exist");
    cy.get('img[src="/images/tailwindcss.svg"]').should("exist");
    //All the rights deserves
    cy.get("p.footer_p.text-white.font-Chakra.font-normal.text-sm")
      .invoke("text")
      .then((text) => {
        const expectedText =
          "Todos los derechos reservados JulianDesign© 2024".replace(
            /\s+/g,
            ""
          ); // Remove all white spaces
        const cleanText = text.replace(/\s+/g, ""); // Remove all white spaces from the obtained text
        expect(cleanText).to.include(expectedText);
      });
  });

  it("TC7:Activate Music Button Functionality", () => {
    cy.get('div[data-ison="false"]')
      .should("exist")
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get('div[data-ison="true"]')
      .should("exist")
      .should("be.visible")
      .click();
  });
});
