const faker = require("faker");

describe('Test Scenario 2', () => {
    before(() => {
        cy.visit('/')
    })
    beforeEach(function () {
        cy.viewport('samsung-note9')
        cy.injectAxe();
    });
    it('Scenario2', () => {
        cy.title().should('contain', 'Selenium Grid Online');
        cy.get('.st_heading:first').should('be.visible').should('have.text', ' Input Forms')
        cy.contains('Input Form Submit').should('be.visible')
        cy.contains('Input Form Submit').click()
        cy.get('#seleniumform').scrollIntoView()
    })

    it('Has a valid form.', function () {
        cy.get('#seleniumform').within(() => {
            cy.get('input#name').should('be.visible');
            cy.get('input#inputEmail4').should('be.visible');
            cy.get('input#inputPassword4').should('be.visible');
            cy.get('input#company').should('be.visible');
            cy.get('input#websitename').should('be.visible');
            cy.xpath("//label[@for='inputCountry']").should('be.visible')
            cy.get('input#inputCity').should('be.visible');
            cy.get('input#inputAddress1').should('be.visible');
            cy.get('input#inputAddress2').should('be.visible');
            cy.get('input#inputState').should('be.visible');
            cy.get('input#inputZip').should('be.visible');
            cy.get('button').should('be.visible');
        });

    })
    it('Fill form details', function () {
        let username = faker.name.findName()
        let email = faker.internet.email()
        let password = faker.internet.password()
        let company = faker.company.companyName()
        let zipCode = faker.address.zipCode()
        let address = faker.address.streetAddress()
        let address2 = faker.address.secondaryAddress()
        let state = faker.address.state()
        let website = 'www.' + faker.lorem.word() + '.com'
        let city = faker.address.city()
        cy.get('#seleniumform').within(() => {
            cy.get('input#name').type(username)
            cy.get('input#inputEmail4').type(email);
            cy.get('input#inputPassword4').type(password);
            cy.get('input#company').type(company);
            cy.get('input#websitename').type(website);
            cy.get('select').select('India').should('have.value', 'IN')
            cy.get('input#inputCity').type(city);
            cy.get('input#inputAddress1').type(address);
            cy.get('input#inputAddress2').type(address2);
            cy.get('input#inputState').type(state);
            cy.get('input#inputZip').type(zipCode);
            cy.get('button').click()
        });
        cy.fixture('config.json').then((configuration) => {
            cy.lighthouse(configuration.threshold, configuration.lighthouseConfig);
        })
        cy.get('.success-msg').should('have.text', 'Thanks for contacting us, we will get back to you shortly.')
        cy.go('back')
    })
    Cypress.session.clearAllSavedSessions()

})
