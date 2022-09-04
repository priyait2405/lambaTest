describe('Test Scenario 1', () => {
    it('Slider Validation', () => {
        cy.visit('/')
        cy.get('.st_heading').contains('Progress Bars & Sliders').should('be.visible')//.scrollIntoView()
        cy.contains('Drag & Drop Sliders').click()
        cy.get('#slider3').contains('Default value 15').should('be.visible')
        cy.get('#slider3').find('input[type=range]').setSlider('95')
        cy.get('output#rangeSuccess').should('have.text', '95')
    })
})
