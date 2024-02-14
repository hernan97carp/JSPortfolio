describe("Navbar Test", () => {
  beforeEach("", () => {
    cy.visit("https://juliandesign.vercel.app/");
  });

  it("TC1: Should navigate to correct URLs and display appropriate text ", () => {
    //home
    cy.get('a[href="/"]').should("contain.text", "Home").should('be.visible');
    cy.get("a[href='/']").eq(1).click();
    cy.url().should("include", "/");
    //work
    cy.get('a[href="/work"]').should("contain.text", "Trabajos").should('be.visible');
    cy.get("a[href='/work']").click();
    cy.url().should("include", "/work");

    //projects
    cy.get('a[href="/projects"]').should("contain.text", "Proyectos").should('be.visible');
    cy.get("a[href='/projects']").click();
    cy.url().should("include", "/projects");
    //contact
    cy.get('a[href="/contact"]').should("contain.text", "Contacto").should('be.visible');
    cy.get("a[href='/contact']").eq(0).click();
    cy.url().should("include", "/contact");
    //Button Logo
    cy.get(('img[alt="Julian Design"]')).eq(1).should('exist').click()
    cy.url().should("include", "/");
  });
  it("TC2:Validate the text of Presentation", () => {
    cy.get(
      "h1.font-Chakra.font-semibold.uppercase.text-white.text-left.sm\\:text-right"
    )
      .invoke("text")
      .should("include", "¡Hola!Soy Julian");

    cy.get("h2.font-Chakra.font-semibold.uppercase.textShadow")
      .invoke("text")
      .should("include", "Frontend Developer & Web Designer");

    //personalInformation
    cy.get(
      "h3.font-Chakra.font-medium.text-2xl.md\\:text-3xl.mt-0.text-center.subtitleBorder.uppercase"
    )
      .contains("Sobre mi")
      .should("exist");

    cy.fixture("home/home.Text").then((the) => {
      const textRegards = the.presentation.personalInformation;

      cy.get(
        "p.font-Chakra.font-medium.text-base.text-center.md\\:text-left.w-full.mt-3.p_Mod"
      )
        .invoke("text")
        .then((text) => {
          const cleanedText = text.trim().replace(/\s+/g, " ");

          expect(cleanedText).to.include(textRegards);
        });
    });
  });

  it("TC3:Validate the existence of the image presentation", () => {
    cy.get(".jsx-715cca82d3844859.svg-style").should("exist");
    //The opacity about this image its 0 sou I prefer not verify if is be.visible
    //because for that I would have to modify the HTMl
  });

  it('TC4:Validate the existence of the all skills',()=>{
    cy.get(
      "h3.font-Chakra.font-medium.text-2xl.md\\:text-3xl.mt-0.text-center.subtitleBorder.uppercase"
    )
      .contains("Skills")
      .should("exist");

    cy.get('img[src="/images/html.png"]').should("exist").click()
    cy.get('img[src="/images/css.png"]').should("exist").click();
    cy.get('img[src="/images/js.png"]').should("exist").click();
    cy.get('img[src="/images/next.png"]').eq(0).should("exist").click();
    cy.get('img[src="/images/react.png"]').should("exist").click();
    cy.get('img[src="/images/tailwind.png"]').should("exist").click();
    cy.get('img[src="/images/logo-bootstrap.png"]').should("exist").click();
    cy.get('img[src="/images/vscode.png"]').should("exist").click();


    
  })


it('TC5:Validate the elements of the footer',()=>{

//This site was create with:
  cy.get('p.footer_p.text-white.font-Chakra.font-normal.text-xs.m-0.pr-2').invoke('text').should('contains','Este sitio fue desarrolado con:')
//images
cy.get('img[src="/images/framer.svg"]').should('exist')
cy.get('img[src="/images/next.png"]').should('exist')
cy.get('img[src="/images/tailwindcss.svg"]').should('exist')
//All the rights deserves
cy.get('p.footer_p.text-white.font-Chakra.font-normal.text-sm').invoke('text').then((text) => {
  const expectedText = 'Todos los derechos reservados JulianDesign© 2024'.replace(/\s+/g, ''); // Remove all white spaces
  const cleanText = text.replace(/\s+/g, ''); // Remove all white spaces from the obtained text
  expect(cleanText).to.include(expectedText);
});
})

it('TC6:Activate Music Button Functionality',()=>{
  cy.get('div[data-ison="false"]').should('exist').should('be.visible').click()
  cy.wait(1000)
  cy.get('div[data-ison="true"]').should('exist').should('be.visible').click()
})
});


