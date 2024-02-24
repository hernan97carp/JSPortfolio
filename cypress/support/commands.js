Cypress.Commands.add('twoClicksRightsOneLeft', (firstElement, secondElement, ThirdElement) => {
	cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', firstElement);

	cy.get('.btnSliderR')
		.should('exist')
		.click()
		.wait(300)
		.then(() => {
			cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', secondElement);
		});

	cy.get('.btnSliderR')
		.should('exist')
		.click()
		.wait(300)
		.then(() => {
			cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', ThirdElement);
		});
	cy.get('.btnSliderL')
		.should('exist')
		.click()
		.wait(300)
		.then(() => {
			cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', secondElement);
		});
});

Cypress.Commands.add('twoClicksLeftOneRight', (firstElement, secondElement, ThirdElement) => {
	cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', firstElement);

	cy.get('.btnSliderL')
		.should('exist')
		.click()
		.wait(300)
		.then(() => {
			cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', secondElement);
		});

	cy.get('.btnSliderL')
		.should('exist')
		.click()
		.wait(300)
		.then(() => {
			cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', ThirdElement);
		});
	cy.get('.btnSliderR')
		.should('exist')
		.click()
		.wait(300)
		.then(() => {
			cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', secondElement);
		});
});

Cypress.Commands.add('navigateSliderToLeft', elementText => {
	cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', elementText);

	cy.get('.btnSliderL').should('exist').click();
	cy.wait(200);
});

Cypress.Commands.add('sliderTourToLeft', () => {
	const elements = ['CriptoCotizador', 'Admin. de Veterinaria', 'Cotizador de Seguros', 'Wallet', 'Clima', 'CriptoCotizador'];

	elements.forEach(element => {
		cy.navigateSliderToLeft(element);
		cy.wait(200);
	});
});

Cypress.Commands.add('navigateSliderToRight', elementText => {
	cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', elementText);

	cy.get('.btnSliderR').should('exist').click();
	cy.wait(200);
});

Cypress.Commands.add('sliderTourToRight', () => {
	const elements = ['CriptoCotizador', 'Clima', 'Wallet', 'Cotizador de Seguros', 'Admin. de Veterinaria'];

	elements.forEach(element => {
		cy.navigateSliderToRight(element);
		cy.wait(200);
	});
});

Cypress.Commands.add('showProjects', project => {
	cy.get('.px-7 > .text-base').should('exist').invoke('text').should('contain', project);
});

Cypress.Commands.add('validationFormInsurance', (model, plan, year) => {
	cy.get('h2').contains('Resumen de Cotizacion');

	cy.get('ul > :nth-child(1)')
		.invoke('text')
		.then(text => {
			expect(text).to.include(model);
		});
	cy.get('ul > :nth-child(2)')
		.invoke('text')
		.then(text => {
			expect(text).to.include(plan);
		});
	cy.get('ul > :nth-child(3)')
		.invoke('text')
		.then(text => {
			expect(text).to.include(year);
		});
	cy.get('.css-qmxrgr')
		.invoke('text')
		.then(result => {
			expect(result.toLowerCase()).to.include('el total es');
		});
});

Cypress.Commands.add('inputFieldsOptions', (model, year, plan) => {
	model && cy.get(':nth-child(1) > .css-ajjmmw').select(model);
	year && cy.get(':nth-child(2) > .css-ajjmmw').select(year);
	plan && cy.get(`[value="${plan}"]`).click({ force: true });

	cy.get('.css-1cro71e').click();
});

Cypress.Commands.add('fieldFormVeterinary', (pet, owner, time, Symptoms) => {
	const fechaActual = new Date().toISOString().split('T')[0];
	pet && cy.get('[name="mascota"]').click().type(pet);
	owner && cy.get('[name="propietario"]').click().type(owner);
	cy.get('input[name="fecha"]').type(fechaActual);
	time && cy.get('[type="time"]').type(time);
	Symptoms && cy.get('textarea.u-full-width').type(Symptoms);

	cy.get('.button-primary').click();
});

Cypress.Commands.add('validateAppointmentDetails', (pet, owner, date, Symptoms) => {
	cy.get('.cita > :nth-child(1)')
		.invoke('text')
		.then(result => {
			expect(result).to.include(`Mascota: ${pet}`);
		});
	cy.get('.cita > :nth-child(2)')
		.invoke('text')
		.then(result => {
			expect(result).to.include(`Dueño: ${owner}`);
		});
	cy.get('.cita > :nth-child(4)')
		.invoke('text')
		.then(result => {
			expect(result).to.include(`Hora: ${date}`);
		});
	cy.get('.cita > :nth-child(5)')
		.invoke('text')
		.then(result => {
			const expectedText = `Sintomas: ${Symptoms}`;
			expect(result.trim()).to.equal(expectedText);
		});
});

Cypress.Commands.add('validateFormSubmission', () => {
	cy.get('.alerta-error').invoke('text').should('include', 'Todos los campos son obligatorios');
	cy.get('.cita').should('not.exist');
});
