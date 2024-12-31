"use client"
import Product from "@/interfaces/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "@/components/notFound";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "@/state/cartSlice";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | undefined>()
  const [isFindProduct, setIsFindProduct] = useState(true)
  const searchParams = useParams();
  const dispatch = useDispatch();
  const productID = searchParams.id
  const priceFormated = () => {
    if(product){
      let value = product.price
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }
  }

  const promotionalPriceFormated = () => {
    if(product?.promotional_price){
      let value = product.promotional_price
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }
  }
  useEffect(() => {
    fetch(`https://api-prova-frontend.solucoeslifeapps.com.br/products?id=${productID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {

          setProduct(data[0])
        } else {
          setIsFindProduct(false)
        }


      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])

  function handleAddToCart() {
    if (product) {
      dispatch(addProduct(product))
    }
  }
  return (
    <>
      {product ? (
        <div className="min-h-screen h-screen flex flex-col justify-between items-center">
          <Navbar />
          <main className="w-full h-full flex flex-col justify-start items-start px-20 py-2 ">
            <p className="text-lg text-slate-700">
              <Link href="/">Home / Produtos / </Link><span className="font-medium">{product.category}</span>
            </p>
            <div className="px-10 py-4 grid grid-cols-2 gap-20 w-full">
              <Image
                src={product.image}
                alt="Product not found"
                className="h-auto object-contain max-h-[500px]"
                width={600}
                height={500}
              />
              <div className="flex flex-col justify-between w-full">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold text-slate-800">{product.name}</h1>
                    <button>
                      <Heart />
                    </button>
                  </div>

                  <p className="text-2xl text-red-500 font-medium">
                    {product.promotional_price ? (
                        <p>
                          <span className="text-lg text-slate-500 line-through">{priceFormated()}</span>
                          <span> {promotionalPriceFormated()}</span>
                        </p>
                    ) : (
                      <span>
                        {priceFormated()}
                      </span>
                    )}
                  </p>

                  <div className="">
                    <h3 className="text-xl font-medium text-slate-800">Descrição</h3>
                    <p>
                      {product.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="w-full py-4 bg-green-500 text-white text-lg hover:bg-green-600 transition">
                  ADICIONAR AO CARRINHO
                </button>
              </div>

            </div>
          </main>
          <Footer />
        </div>
      ) : (
        <div>
          {isFindProduct ? (
            <div>
              <Loading />
            </div>
          ) : (
            <NotFound />
          )}
        </div>

      )}
    </>
  )

}