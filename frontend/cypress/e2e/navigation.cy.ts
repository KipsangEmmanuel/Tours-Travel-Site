describe('navigation', () => {

    it('should navigate back and forth', () => {
        cy.visit('http://localhost:4200/')

    })

    it('should navigate to register page', () => {
        cy.visit('http://localhost:4200/register')
    })

    it('should navigate  to admin page', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('[data-cy="login-form"]')
        cy.get('[data-cy="email"]').type('emmanuel@gmail.com')
        cy.get('[data-cy="password"]').type('@Emmanuel123')
        cy.get('[data-cy="login-btn"]').click()
         
    })

    it('should navigate to user dashboard', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('[data-cy="login-form"]')
        cy.get('[data-cy="email"]').type('alfred@gmail.com')
        cy.get('[data-cy="password"]').type('@Alfred123')
        cy.get('[data-cy="login-btn"]').click()
    })

    it('should not login user with a wrong email', () => {
        cy.visit('http://localhost:4200/login')

    })

})