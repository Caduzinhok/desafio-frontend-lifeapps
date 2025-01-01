"use client"

import Navbar from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import CategoryFilterInterface from "@/interfaces/categoryFilter";
import Product from "@/interfaces/product";
import Footer from "@/components/footer";
import ProductCard from "@/components/home/productCard";
import NavigationOptions from "@/components/home/navigationOptions";
import CategoryFilter from "@/components/home/categoryFilter";
import OrderFilter from "@/components/home/orderFilter";
import { categoryFilters } from "@/constants/categoryFilters";



export default function Home() {
  const [arrayCategoryFilters, setArrayCategoryFilters] = useState<CategoryFilterInterface[]>(categoryFilters)
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
        setProducts(data)
        setTotalPages(Math.ceil(data.length / productsPerPage))
        setTotalProducts(data.length)
        setAuxProducts(data)
        FilterProductsByPage(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    FilterProductsByPage()
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
        setTotalPages(Math.ceil(auxProducts.length / productsPerPage))
      }

      // Atualizar para todos os produtos
      setProducts(auxProducts)
      FilterProductsByPage(auxProducts)
      return
    }

    // Pegar apenas os produtos com a categoria filtrada
    let arrayProducts = auxProducts?.filter((product) => {
      return product.category === categoryName && product
    })

    setProducts(arrayProducts)

    if (arrayProducts) {
      setTotalProducts(arrayProducts.length)
      setTotalPages(Math.ceil(arrayProducts.length / productsPerPage))
    }
    setCurrentPage(1)

  }

  function OrderByFilter(selectedFilter: string) {
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

function FilterProductsByPage(loadedProducts?: Product[]) {
    const productsToFilter = loadedProducts || products;
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = productsToFilter?.slice(indexOfFirstProduct, indexOfLastProduct)
    setProducts(currentProducts)
  }

  function nextPage() {
    setCurrentPage(prev => prev + 1)
    setProducts(auxProducts)

  }

  function lastPage() {
    setCurrentPage(prev => prev - 1)
    setProducts(auxProducts)
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

        <CategoryFilter
        filterProductsByCategory={filterProductsByCategory}
        arrayCategoryFilters={arrayCategoryFilters}
        />

        <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:gap-0 md:justify-between md:px-20">
          <span className="text-lg font-medium">
            {totalProducts && `${totalProducts} Produtos`}
          </span>

          <OrderFilter OrderByFilter={OrderByFilter} />
        </div>

        <div className="px-4 py-10 flex flex-col gap-4 items-center justify-center md:flex-row md:flex-wrap md:px-20">
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
