"use client"

import Navbar from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import CategoryFilter from "@/interfaces/categoryFilter";
import Product from "@/interfaces/product";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import ProductCard from "@/components/productCard";
import NavigationOptions from "@/components/navigationOptions";

const categoryFilters: CategoryFilter[] = [
  {
    name: 'Todos os Produtos',
    selected: true,
  },
  {
    name: 'Tênis',
    selected: false,
  },
  {
    name: 'Camisetas',
    selected: false,
  },
  {
    name: 'Calças',
    selected: false,
  }
]

export default function Home() {
  const [arrayCategoryFilters, setArrayCategoryFilters] = useState<CategoryFilter[]>(categoryFilters)
  const [auxProducts, setAuxProducts] = useState<Product[]>() // Array auxiliar de produtos para não chamar a API toda vez que alterar a listagem de produtos
  const [products, setProducts] = useState<Product[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const productsPerPage = 9 // Quantidade de produtos por página pré setado

  useEffect(() => {
    fetch('https://api-prova-frontend.solucoeslifeapps.com.br/products')
      .then((response) => response.json())
      .then((data) => {

        // Atualizar Estados para gerenciamento de catalogo de produtos
        setProducts(data);
        setTotalPages(Math.ceil(data.length / productsPerPage))
        setTotalProducts(data.length)
        setAuxProducts(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    filter_products_by_page();
  }, [currentPage]);

  function filterProductsByCategory(categoryName: string) {
    // Alterar a opção selecionada de acordo com o click atual
    let auxArrayFilters = arrayCategoryFilters.map((categoryFilter) => {
      categoryFilter.selected = categoryFilter.name === categoryName ? true : false
      return categoryFilter
    })

    setArrayCategoryFilters(auxArrayFilters) // Atualizar filtros para mostrar o atual selecionado

    if (categoryName === "Todos os Produtos") {
      // Atualizar a quantidade de produtos na pagina
      if (auxProducts) {
        setTotalProducts(auxProducts.length)
      }

      // Atualizar para todos os produtos
      setProducts(auxProducts)
      return
    }

    let arrayProducts = auxProducts?.filter((product) => {
      return product.category === categoryName && product
    })

    setProducts(arrayProducts)

    if (arrayProducts) {
      setTotalProducts(arrayProducts.length)
    }
    setCurrentPage(1)
  }

  function order_by_filter(selectedFilter: string) {
    let arrayProducts = products

    if (selectedFilter !== 'most-purchased') {
      arrayProducts = products?.toSorted((prevProduct, nextProduct) => {
        let nextPrice = nextProduct.promotional_price ? nextProduct.promotional_price : nextProduct.price
        let prevPrice = prevProduct.promotional_price ? prevProduct.promotional_price : prevProduct.price
        return selectedFilter === 'highest-price' ?
          (Number(nextPrice) - Number(prevPrice)) :
          (Number(prevPrice) - Number(nextPrice))
      })

      setProducts(arrayProducts) // Observação para ajustar - Quando está com categoria filtrada, está limpando o filtro de categoria.
      return
    }

    setProducts(auxProducts)
  }

  function filter_products_by_page() {
    if (products === undefined) { // Validação de que existem produtos na lista
      return
    }
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    setProducts(currentProducts)
  }

  function nextPage() {
    setProducts(auxProducts)
    setCurrentPage(prev => prev + 1)

  }

  function lastPage() {
    setProducts(auxProducts)
    setCurrentPage(prev => prev - 1)
  }

  return (
    <div className="max-w-[100vw] w-screen">
      <Navbar />
      <main className="space-y-8 mb-20">
        <div className="md:h-96 overflow-hidden relative">
          <Image
            src="/background-image.jpg"
            alt="Main image about shopping"
            className="fill-inherit bg-cover w-full h-full md:w-auto md:h-auto"
            width={1920}
            height={800}
          />
        </div>

        <h2 className="text-center text-3xl font-semibold">
          Conheça nossos produtos
        </h2>

        <div className="flex flex-col w-full px-2 gap-4 justify-between items-center md:gap-8 md:flex-row md:px-20">
          {arrayCategoryFilters.map((categoryFilter) => {
            return (
              <div key={categoryFilter.name} className="w-full">
                <button
                  onClick={() => filterProductsByCategory(categoryFilter.name)}
                  className={`min-w-64 w-full py-4 text-lg text-center border border-slate-500 shadow-sm shadow-slate-500 transition hover:bg-slate-500 hover:text-white ${categoryFilter.selected && 'bg-slate-500 text-white'}`}>
                  {categoryFilter.name}
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between items-center px-20">
          <span className="text-lg font-medium">
            {totalProducts && `${totalProducts} Produtos`}
          </span>

          <select name="filter-order" id="filter-order" className="w-64 py-2 px-4 border border-slate-500 focus:outline-none" onChange={e => order_by_filter(e.target.value)}>
            <option value="most-purchased">Mais Comprados</option>
            <option value="highest-price">Maior Preço</option>
            <option value="lowest-price">Menor Preço</option>
          </select>
        </div>

        <div className="px-20 py-10 flex flex-wrap gap-4 items-center justify-center">
          {products && (
            products.map((product) => {
              return (
                <ProductCard key={product.id}
                  {...product}
                />
              )
            })
          )}
        </div>

        <NavigationOptions
          totalPages={totalPages}
          nextPage={nextPage}
          lastPage={lastPage}
          currentPage={currentPage}
        />
      </main>

      <Footer />
    </div>
  );
}
