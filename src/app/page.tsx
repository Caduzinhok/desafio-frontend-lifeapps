"use client"

import Navbar from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import CategoryFilter from "@/interfaces/categoryFilter";
import Product from "@/interfaces/product";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const [auxProducts, setAuxProducts] = useState<Product[]>()
  const [products, setProducts] = useState<Product[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const productsPerPage = 9

  useEffect(() => {
    fetch('https://api-prova-frontend.solucoeslifeapps.com.br/products')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setTotalPages(Math.ceil(data.length / productsPerPage))
        setAuxProducts(data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    filter_products_by_page();
  }, [currentPage]);

  function filterProductsByCategory(name: string) {
    // Alterar a opção selecionada de acordo com o click atual
    let auxArrayFilters = arrayCategoryFilters.map((categoryFilter) => {
      categoryFilter.selected = categoryFilter.name === name ? true : false
      return categoryFilter
    })

    // Atualizar as opções com o novo estado do item selecionado
    setArrayCategoryFilters(auxArrayFilters)
  }

  function filter_products_by_page() {
    if (products === undefined) { // Validação de que existem produtos na lista
      return
    }
    console.log("Entrou aqui")
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    console.log(currentProducts)
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
    <div className="max-w-full w-full">
      <Navbar />
      <main className="space-y-8 w-full">
        <div className="h-96 overflow-hidden relative">
          <Image
            src="/background-image.jpg"
            alt="Main image about shopping"
            className="fill-inherit bg-cover"
            width={1920}
            height={500}
          />
        </div>

        <h2 className="text-center text-3xl font-semibold">
          Conheça nossos produtos
        </h2>

        <div className="flex w-full px-20 justify-between items-center gap-8">
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
            {auxProducts && `${auxProducts.length} Produtos`}
          </span>

          <select name="filter-order" id="filter-order" className="w-64 py-2 px-4 border border-slate-500 focus:outline-none ">
            <option value="most-purchased">Mais Comprados</option>
            <option value="highest-price">Maior Preço</option>
            <option value="lowest-price">Menor Preço</option>
          </select>
        </div>

        <div className="px-20 py-10 flex flex-wrap gap-4 items-center justify-center">
          {products && (
            products.map((product) => {
              return (
                <div key={product.id} className="flex flex-col space-y-5 items-center basis-1/4 max-w-1/4">
                  <div className="relative w-full h-96">
                    <Image
                      src={product.image}
                      alt="Main image about shopping"
                      className="object-cover w-full h-full"
                      width={400}
                      height={300}
                    />
                  </div>
                  <p className="text-xl text-slate-900">{product.name}</p>
                  {product.promotional_price ? (
                    <div className="space-x-4">
                      <span className="line-through text-slate-600">R$ {product.price.toString()}</span>
                      <span className="">R$ {product.promotional_price.toString()}</span>
                    </div>
                  ) : (
                    <span className="text-black">R$ {product.price.toString()}</span>
                  )}

                </div>
              )
            })
          )}
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <button
            onClick={lastPage}
            className={`bg-slate-800 p-2 ${currentPage === 1 && "bg-slate-300"}`} disabled={currentPage === 1 ? true : false}
          >
            <ArrowLeft className="size-6 text-white" />
          </button>

          <span className="text-2xl font-medium p-2">{currentPage.toString()}</span>

          <button
            className={`bg-slate-800 p-2 ${currentPage === totalPages && "bg-slate-300"}`} disabled={currentPage === totalPages ? true : false}
            onClick={nextPage}
          >
            <ArrowRight className="size-6 text-white" />
          </button>
        </div>
      </main>
    </div>
  );
}
