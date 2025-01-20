describe('Dufresne Auto', () => {
  it('Checkout', () => {

    //visit dufresne home page
    cy.visit('https://dufresne.ca/')

    //make fullscreen
    cy.viewport(window.screen.width, window.screen.height);

    //Close the promo modal if visible 
    cy.get('body').then($body => {
      if ($body.find("#proof-factor-cb-content .cross1", { timeout: 20000 }).length > 0) {
        cy.get('#proof-factor-cb-content .cross1').click()
      } else {
        //Do something
      }
    })

    //set postal code
    cy.get('[data-cy="store-locator-trigger"]').click()
    cy.get('[data-cy="postalcode-input"]').clear({force: true}).type('R3T4K4')

    //visit sectionals page
    cy.visit('https://dufresne.ca/collections/sectionals')

    //Add a product and go to checkout
    cy.contains('Marleton 2 Piece Sectional with Chaise').click()
    cy.contains('Add to cart').click()
    cy.get('[data-cy="ppp-modal-close-btn"]').click()
    cy.contains('View Cart').click()
    cy.get('[data-cy="postalcode-input"]').eq(1).clear()
    cy.get('[data-cy="postalcode-input"]').eq(1).type('R3T4K4')
    cy.get('[data-cy="btn-postalcode-update"]').eq(1).click()
    cy.contains('Checkout with a Credit card, PayPal, or Affirm').click()


    //Fill checkout form fields
    cy.get('#email').type('test@test.com')
    //cy.get('#TextField7').type('test')
    cy.get('[name="firstName"]').eq(0).type('test')
    cy.get('[name="lastName"]').eq(0).type('lastname')
    cy.get('[name="address1"]').eq(0).type('3030 Pembina hwy')
    cy.get('[name="city"]').eq(0).type('winnipeg')
    cy.get('[name="phone"]').eq(0).type('(204) 430-0000')

    //Go to payment page
    cy.contains('Continue to shipping').click()
    cy.contains('Continue to payment').click()

    //verify we are on the payment page
    cy.get('#checkout-main-header').should('have.text', 'Payment methods')

    //Test complete

  })
})