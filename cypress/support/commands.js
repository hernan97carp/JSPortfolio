// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('twoClicksRightsOneLeft',(firstElement,secondElement,ThirdElement)=>{

    cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',firstElement)

    cy.get('.btnSliderR').should('exist').click().wait(400).then(()=>{
        cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',secondElement)
    })

    cy.get('.btnSliderR').should('exist').click().wait(400).then(()=>{
        cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',ThirdElement)
    })
    cy.get('.btnSliderL').should('exist').click().wait(400).then(()=>{
        cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',secondElement)
    })

})


Cypress.Commands.add('twoClicksLeftOneRight',(firstElement,secondElement,ThirdElement)=>{


    cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',firstElement)

    cy.get('.btnSliderL').should('exist').click().wait(400).then(()=>{
        cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',secondElement)
    })

    cy.get('.btnSliderL').should('exist').click().wait(400).then(()=>{
        cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',ThirdElement)
    })
    cy.get('.btnSliderR').should('exist').click().wait(400).then(()=>{
        cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain',secondElement)
    })


    
})


Cypress.Commands.add('navigateSliderToLeft', (elementText) => {
    cy.wait(400);
    cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', elementText);
    cy.wait(100);
    cy.get('.btnSliderL').should('exist').click();
  });
  
  Cypress.Commands.add('sliderTourToLeft', () => {
    const elements = [
      'CriptoCotizador',
      'Admin. de Veterinaria',
      'Cotizador de Seguros',
      'Wallet',
      'Clima',
      'CriptoCotizador'
    ];
  
    elements.forEach(element => {
      cy.navigateSliderToLeft(element);
      cy.wait(100); // Espera entre cada paso del recorrido
    });
  });





  Cypress.Commands.add('navigateSliderToRight', (elementText) => {
    cy.wait(400);
    cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', elementText);
    cy.wait(100);
    cy.get('.btnSliderR').should('exist').click();
  });
  
  Cypress.Commands.add('sliderTourToRight', () => {
    const elements = [
      'CriptoCotizador',
      'Clima',
      'Wallet',
      'Cotizador de Seguros',
      'Admin. de Veterinaria'
      
    ];
  
    elements.forEach(element => {
      cy.navigateSliderToRight(element);
      cy.wait(100); // Espera entre cada paso del recorrido
    });
  });