describe('This is a section its about take contact with developer', () => {
	beforeEach(() => {
		cy.visit('https://juliandesign.vercel.app/contact');
	});

	it('TC1: Validate the text of Presentation', () => {
		cy.get('h1.font-Chakra.font-semibold.uppercase.text-white.text-left.sm\\:text-right').invoke('text').should('include', '¡Hola!Soy Julian');

		cy.get('h2.font-Chakra.font-semibold.uppercase.textShadow').invoke('text').should('include', 'Frontend Developer & Web Designer');
	});

	it('TC2:Validate the existence of the form and your elements', () => {
		cy.get('.textModCenter > .flex').should('exist');
		cy.get('[type="text"]').should('exist');
		cy.get('[placeholder="Ej: WalterHR@gmail.com"]').should('exist');
		cy.get('.h-24').should('exist');
		cy.get('.px-4').should('exist');
	});
	it('TC3:Validate not send a message with the input name is empty', () => {
		cy.get('.textModCenter > .flex').should('exist');
		cy.get('input[type="text"]').should('exist').clear();
		cy.get('[placeholder="Ej: WalterHR@gmail.com"]').should('exist').type('testssdwwsd@hotmail.com');
		cy.get('.h-24').should('exist').type('this a test message');
		cy.get('.px-4').should('exist').click();
	});
	it('TC4:Validate not send a message with the input email is empty', () => {
		cy.get('.textModCenter > .flex').should('exist');
		cy.get('[type="text"]').should('exist').type('hernan');
		cy.get('[placeholder="Ej: WalterHR@gmail.com"]').should('exist').clear();
		cy.get('.h-24').should('exist').type('this a test message');
		cy.get('.px-4').should('exist').click();
	});

	it('TC5:Validate not send a message with the input message is empty', () => {
		cy.get('.textModCenter > .flex').should('exist');
		cy.get('[type="text"]').should('exist').type('hernan');
		cy.get('[placeholder="Ej: WalterHR@gmail.com"]').should('exist').type('testssdwwsd@hotmail.com');
		cy.get('.h-24').should('exist').clear();
		cy.get('.px-4').should('exist').click();
	});

	it('TC6:Validate the user can send the message with the correctly data', () => {
		cy.get('.textModCenter > .flex').should('exist');
		cy.get('[type="text"]').should('exist').type('hernan');
		cy.get('[placeholder="Ej: WalterHR@gmail.com"]').should('exist').type('testssdwwsd@hotmail.com');
		cy.get('.h-24').should('exist').type('this a test message');
		cy.get('.px-4').should('exist');
	});

	it('TC7:Activate Music Button Functionality', () => {
		cy.get('div[data-ison="false"]').should('exist').should('be.visible').click();
		cy.wait(1000);
		cy.get('div[data-ison="true"]').should('exist').should('be.visible').click();
	});
});
