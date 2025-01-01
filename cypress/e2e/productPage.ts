describe("Página de Produtos", () => {
    it('Deve abrir um produto específico e verificar se o produto carregou', () => {
        // Adicionar um produto específico
        cy.visit('http://localhost:3000/produtos/T%C3%AAnis/2')

        // Verificar se ao menos um produto está visível
        cy.contains('Chuteira').should('be.visible')
    })

    it('Deve adicionar um produto ao carrinho e apareceu na sacola', () => {
        // Adicionar um produto específico
        cy.visit('http://localhost:3000/produtos/T%C3%AAnis/2')

        // Verificar se ao menos um produto está visível
        cy.contains('Chuteira').should('be.visible')

        // Adicionar o primeiro produto visível ao carrinho
        cy.get('#add-to-cart').click()
        
        // Aguardar 2s para adicionar item no carrino
        cy.wait(2000)

        cy.get('#cart-quantity').should('contain', '1')

    })

    it('Deve conter o preço do produto específico', () => {
        // Adicionar um produto específico
        cy.visit('http://localhost:3000/produtos/T%C3%AAnis/2')

        cy.get('.product-price').should('not.be.empty')

    })
})