# Desafio Frontend Lifeapps
<p>
Este projeto visa a solução do Desafio de Frontend de criação de um simples e-commerce de vestuário.
</p>

## Objetivo
O objetivo é implementar um e-commerce para venda de vestuário. O layout é composto por uma página de catálogo de produtos, onde o usuário pode filtrar por categoria e buscar por nome do produto:
- [X] Listagem de produtos com paginação
- [X] Seleção de categorias fixas (Camisetas, Calças, Tênis)
- [X] Visualizar detalhes do produto
- [X] Adicionar e remover produtos do carrinho

## Etapas
- [X] Consuma a **API JSON Server** disponível neste [link](https://api-prova-frontend.solucoeslifeapps.com.br/)
- [X] Utilize React.js ou Vue.js (podendo optar pelo Next.js ou Nuxt.js)
- [ ] Faça a componentização do seu projeto
- [X] Utilize o local storage para gerenciar o carrinho
- [X] Utilize a estrutura da api para fazer a paginação do lado do servidor
- [X] Por favor, inclua no README as instruções de instalação do projeto

## Instalação

Primeiro, execute o seguinte comando:

```bash
npm install
# or
yarn install
```

## Execução
```bash
npm run dev
# or
yarn dev
```

Abra o projeto em [http://localhost:3000](http://localhost:3000) com qualquer navegador e veja como ficou o desafio.

## Observações
Referente a etapa: "Utilize a estrutura da api para fazer a paginação do lado do servidor" - Feito do lado do cliente, pois ao realizar o teste da
API, com o parametro _page & _limit, a mesma não alterou os dados, ex.
Com os seguintes endpoints e parâmetros:
https://api-prova-frontend.solucoeslifeapps.com.br/products?_page=2&_limit=9

https://api-prova-frontend.solucoeslifeapps.com.br/products?_page=1&_limit=9

Ambos os resultados foram idênticos

## Bibliotecas e ferramentas utilizadas
<ul>
    <li>Next JS</li>
    <li>Lucide React</li>
    <li>Redux</li>
    <li>Tailwindcss</li>
    <li>Cypress</li>
</ul>