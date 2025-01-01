describe('Carrinho de Compras', () => {
    beforeEach(() => {
        // Define o estado do carrinho no localStorage
        cy.window().then((window) => {
            window.localStorage.setItem('cart', JSON.stringify([{
                category: "Tênis",
                description: "Tênis futurista com design inovador e confortável. Ideal para quem busca estilo e conforto.",
                discount_percentage: 20,
                id: "1",
                image: "https://s3-sa-east-1.amazonaws.com/prod-superon-public-media/prova-frontend/shoes/shoes-1.jpg",
                name: "Tênis Futurista",
                price: 150,
                promotional_price: 120
            }]));
        });
    });

    it('Deve adicionar um produto ao carrinho e verificar se foi inserido no carrinho de compras', () => {
        // Adicionar um produto específico
        cy.visit('http://localhost:3000/produtos/T%C3%AAnis/1')

        // Verificar se ao menos um produto está visível
        cy.contains('Tênis Futurista').should('be.visible')

        // Adicionar o primeiro produto visível ao carrinho
        cy.get('#add-to-cart').click()
        
        // Aguardar 2s para adicionar item no carrino
        cy.wait(2000)

        // Navegar para página do carrinho
        cy.visit('http://localhost:3000/carrinho')
            
        // Verificar se o nome do produto está presente
        cy.get('.product-name').should('not.be.empty')
    })



    it('Deve exibir a página do carrinho corretamente', () => {
        cy.visit('http://localhost:3000/carrinho')

        // Verificar se a página do carrinho foi carregada
        cy.contains('Carrinho').should('be.visible')

    })

    it('Deve exibir o nome e o preço do produto no carrinho', () => {
        cy.visit('http://localhost:3000/carrinho')

        cy.get('.cart-item').first().within(() => {
            // Verificar se o nome do produto está presente
            cy.get('.product-name').should('not.be.empty')

            // Verificar se o preço do produto está presente
            cy.get('.product-price').should('not.be.empty')
        })
    })

    it('Deve remover um produto do carrinho', () => {
        window.localStorage.setItem('cart', JSON.stringify([{
            category: "Tênis",
            description: "Chuteira para futebol de campo, com travas de borracha e material resistente. Ideal para quem busca desempenho e conforto.",
            id: "2",
            image: "https://s3-sa-east-1.amazonaws.com/prod-superon-public-media/prova-frontend/shoes/shoes-2.jpg",
            name: "Chuteira",
            price: 250
        },
        {
            category: "Tênis",
                description: "Tênis futurista com design inovador e confortável. Ideal para quem busca estilo e conforto.",
                discount_percentage: 20,
                id: "1",
                image: "https://s3-sa-east-1.amazonaws.com/prod-superon-public-media/prova-frontend/shoes/shoes-1.jpg",
                name: "Tênis Futurista",
                price: 150,
                promotional_price: 120
        }
    ]));

        cy.visit('http://localhost:3000/carrinho')

        // Remover o primeiro produto do carrinho
        cy.get('.cart-item').first().within(() => {
            cy.get('.remove-item').click()
        })

        cy.get("#cart-items").first().within(() => {
            cy.get('.product-name').should('not.be.empty')
        })
    })

    it('Deve limpar todo o carrinho', () => {
        cy.visit('http://localhost:3000/carrinho')

        // Clicar no botão para limpar o carrinho
        cy.get('#clear-cart').click()


        cy.contains('Seu carrinho está vazio!').should('be.visible')
    })
})
