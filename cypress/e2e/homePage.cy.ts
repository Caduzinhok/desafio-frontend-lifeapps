describe('template spec', () => {

  
  it('Deve abrir a página inicial corretamente', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Conheça nossos produtos').should('be.visible')

    cy.get('.product-card').first().within(() => {
      cy.get('.product-name')
        .should('not.be.empty')
    })
  })
  it('Deve exibir ao menos um produto na tela', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.products')
      .should('have.length.at.least', 1)
  });

  it('Deve conter o preço do produto', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.product-price')
      .should('not.be.empty')
  })

})