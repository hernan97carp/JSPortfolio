describe('This is a section about the companies with the user work', () => {
	beforeEach(() => {
		cy.visit('https://juliandesign.vercel.app/work');
	});

	it('TC1: Validate the text of Presentation', () => {
		cy.get('h1.font-Chakra.font-semibold.uppercase.text-white.text-left.sm\\:text-right').invoke('text').should('include', '¡Hola!Soy Julian');

		cy.get('h2.font-Chakra.font-semibold.uppercase.textShadow').invoke('text').should('include', 'Frontend Developer & Web Designer');

		cy.get('h3.font-Chakra')
			.invoke('text')
			.then(text => {
				const cleanedText = text.trim();
				expect(cleanedText).to.include('Trabajos  2019 - 2023:');
			});
	});

	it('TC2: Validate the companies with the user work', () => {
		cy.get('#work').should('exist');
		cy.get('.font-Chakra.font-medium.about_p.text-base.text-center.sm\\:text-left.text-white.mt-8.w-full.p_Mod')
			.invoke('text')
			.should('contain', 'Estas son algunas de las varias empresas en las cuales trabajé en proyectos y en donde actualmente trabajo.');

		cy.get(':nth-child(2) > .work_logo > .rounded-l-lg').should('exist').invoke('show');
		cy.get(':nth-child(3) > .work_logo').should('exist').should('exist').invoke('show');
		cy.get(':nth-child(4) > .work_logo > .rounded-l-lg').should('exist').invoke('show');
		cy.get(':nth-child(5) > .work_logo').should('exist').should('exist').invoke('show');
	});

	it('TC3:Validate the elements of the footer', () => {
		//This site was create with:
		cy.get('p.footer_p.text-white.font-Chakra.font-normal.text-xs.m-0.pr-2').invoke('text').should('contains', 'Este sitio fue desarrolado con:');
		//images
		cy.get('img[src="/images/framer.svg"]').should('exist');
		cy.get('img[src="/images/next.png"]').should('exist');
		cy.get('img[src="/images/tailwindcss.svg"]').should('exist');
		//All the rights deserves
		cy.get('p.footer_p.text-white.font-Chakra.font-normal.text-sm')
			.invoke('text')
			.then(text => {
				const expectedText = 'Todos los derechos reservados JulianDesign© 2024'.replace(/\s+/g, ''); // Remove all white spaces
				const cleanText = text.replace(/\s+/g, ''); // Remove all white spaces from the obtained text
				expect(cleanText).to.include(expectedText);
			});
	});

	it('TC4:Activate Music Button Functionality', () => {
		cy.get('div[data-ison="false"]').should('exist').should('be.visible').click();
		cy.wait(1000);
		cy.get('div[data-ison="true"]').should('exist').should('be.visible').click();
	});
});
