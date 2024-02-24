describe('Project | Budget control', () => {
	beforeEach('Precondition:Visit the web site', () => {
		cy.visit('https://controlpresupuesto-react-j47d.netlify.app/');
	});
	it('TC1:Validates not entering the budget control when the budget is not filled', () => {
		cy.contains('Presupuesto');
		cy.get('.button-primary').click();

		cy.get('.alert').contains('El Presupuesto es Incorrecto');
		cy.should('not.contain', 'Gasto Semanal');
	});

	it('TC2: Validates the deduction of transportation expenses from my budget', () => {
		cy.contains('Presupuesto');
		cy.get('[type="number"]').type('400000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Transportation');
		cy.get(':nth-child(3) > .u-full-width').click().type('40000');
		cy.get('.button-primary').click();
		cy.get('.alert-success');
		cy.get('p').contains('Transportation');
	});

	it('TC3: Validates that my budget becomes negative if my expenses exceed it.', () => {
		cy.contains('Presupuesto');
		cy.get('[type="number"]').type('400000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Transportation');
		cy.get(':nth-child(3) > .u-full-width').click().type('500000');
		cy.get('.button-primary').click();
		cy.get('.alert-danger').should('be.visible');
		cy.get('p').contains('Transportation');
	});

	it('TC4: Validates the deduction of transportation expenses from my budget when there are three expenses..', () => {
		cy.contains('Presupuesto');
		cy.get('[type="number"]').type('400000');
		cy.get('.button-primary').click();
		cy.get(':nth-child(2) > .u-full-width').click().type('Transportation');
		cy.get(':nth-child(3) > .u-full-width').click().type('40000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Food');
		cy.get(':nth-child(3) > .u-full-width').click().type('50000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Taxes');
		cy.get(':nth-child(3) > .u-full-width').click().type('60000');
		cy.get('.button-primary').click();

		cy.get('.alert-success').should('be.visible');
		cy.get('p').contains('Transportation');
		cy.get('p').contains('Food');
		cy.get('p').contains('Taxes');
	});

	it('TC5: Validates that my budget becomes negative when there are three significant expenses.', () => {
		cy.contains('Presupuesto');
		cy.get('[type="number"]').type('400000');
		cy.get('.button-primary').click();
		cy.get(':nth-child(2) > .u-full-width').click().type('Transportation');
		cy.get(':nth-child(3) > .u-full-width').click().type('440000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Food');
		cy.get(':nth-child(3) > .u-full-width').click().type('100000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Taxes');
		cy.get(':nth-child(3) > .u-full-width').click().type('220000');
		cy.get('.button-primary').click();

		cy.get('.alert-danger').should('be.visible');
		cy.get('p').contains('Transportation');
		cy.get('p').contains('Food');
		cy.get('p').contains('Taxes');
		cy.get('.alert-danger')
			.invoke('text')
			.then(result => {
				expect(result).to.include('-');
			});
	});

	it('TC6: Validate that a result is not calculated when the expense input is empty but the expense amount is filled.', () => {
		cy.contains('Presupuesto');
		cy.get('[type="number"]').type('400000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(3) > .u-full-width').click().type('440000');
		cy.get('.button-primary').click();
		cy.get('form > .alert').should('contain', 'Ambos campos son obligatorios o Presupuesto incorrecto');
	});
	it('TC7: Validate that a result is not calculated when the expense input is filled but the expense amount is empty.', () => {
		cy.contains('Presupuesto');
		cy.get('[type="number"]').type('400000');
		cy.get('.button-primary').click();

		cy.get(':nth-child(2) > .u-full-width').click().type('Transportation');
		cy.get('.button-primary').click();
		cy.get('form > .alert').should('contain', 'Ambos campos son obligatorios o Presupuesto incorrecto');
		cy.get('p').should('not.contain', 'Transportation');
	});
});
