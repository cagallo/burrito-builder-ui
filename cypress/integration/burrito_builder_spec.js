describe('Burrito Builder user flows', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'singleOrder.json' });
    cy.visit('http://localhost:3000');
  })

  it('should allow users to see submitted orders on page load', () => {
    cy.get('.header').contains('Burrito Builder')
    cy.get('.order-container')
    cy.get('.order').should('have.length', 1)
      .get('.order').first().contains('h3', 'Pat')
    cy.get('.ingredient-list').contains('li', "beans")
      .get('.ingredient-list').contains('li', "lettuce")
      .get('.ingredient-list').contains('li', "carnitas")
      .get('.ingredient-list').contains('li', "queso fresco")
      .get('.ingredient-list').contains('li', "jalapeno")
    cy.get('.delete-button').contains('DELETE')
  })
  
  it('should display a form where users can create their own burrito', () => {
    cy.get('form')
    cy.get('input[name="name"]')
      .type('Chez')
      .should('have.value', 'Chez')
    cy.get('.ingredient-buttons').should('have.length', 12)
      .get('.ingredient-buttons[name="sofritas"]').click()
      .get('p').contains('sofritas')
      .get('.ingredient-buttons[name="jalapenos"]').click()
      .get('p').contains('jalapenos')
      .get('.ingredient-buttons[name="queso fresco"]').click()
      .get('p').contains('queso fresco')
  })

  it('should be able to submit a new burrito order once form is filled out', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
       body: {
        "name": "Chez",
        "ingredients": ["sofritas", "jalapenos", "queso fresco"]
      }
    })
    cy.get('form')
      .get('input[name="name"]')
      .type('Chez')
      .get('.ingredient-buttons[name="sofritas"]').click()
      .get('.ingredient-buttons[name="jalapenos"]').click()
      .get('.ingredient-buttons[name="queso fresco"]').click()
      .get('.submit-user-order-button').click()
      .get('.order-container')
      .get('.order').should('have.length', 2)
      .get('.order').last().contains('h3', 'Chez')
      .get('.order').last().contains('li', 'sofritas')
      .get('.order').last().contains('li', 'jalapenos')
      .get('.order').last().contains('li', 'queso fresco')
  })

  it('should not be able to submit form if name field is empty', () => {
    cy.get('.ingredient-buttons[name="sofritas"]').click()
      .get('.submit-user-order-button').click()
      .get('.order-container')
      .get('.order').should('have.length', 1)
  })

  it('should not be able to submit form if no ingredients are added', () => {
    cy.get('input[name="name"]').type('Chez')
      .get('.submit-user-order-button').click()
      .get('.order-container')
      .get('.order').should('have.length', 1)
  })

  it('should be able to delete an order once it is picked up', () => {
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/1', {
      statusCode: 201
    })
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'emptyOrder.json' })
    cy.get('.delete-button').click()
  })
})
