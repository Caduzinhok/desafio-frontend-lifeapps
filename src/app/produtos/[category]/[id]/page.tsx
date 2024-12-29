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

export default function ProductPage() {
  const [produto, setProduto] = useState<Product | undefined>()
  const [isFindProduct, setIsFindProduct] = useState(true)
  const searchParams = useParams();
  const productID = searchParams.id
  const priceFormated = produto && produto.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  useEffect(() => {
    fetch(`https://api-prova-frontend.solucoeslifeapps.com.br/products?id=${productID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data[0]) {

          setProduto(data[0])
        } else {
          setIsFindProduct(false)
        }


      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])
  return (
    <>
      {produto ? (
        <div className="min-h-screen h-screen flex flex-col justify-between items-center">
          <Navbar />
          <main className="w-full h-full flex flex-col justify-start items-start px-20 py-2 ">
            <p className="text-lg text-slate-700">
              <Link href="/">Home / Produtos / </Link><span className="font-medium">{produto.category}</span>
            </p>
            <div className="px-10 py-4 grid grid-cols-2 gap-20">
              <Image
                  src={produto.image}
                  alt="Product not found"
                  className="h-auto object-contain max-h-[500px]"
                  width={600}
                  height={500}
                />
              <div className="flex flex-col justify-between">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold text-slate-800">{produto.name}</h1>
                    <button>
                      <Heart />
                    </button>
                  </div>

                  <p className="text-2xl text-red-500 font-medium">
                    {priceFormated}
                  </p>

                  <div className="">
                    <h3 className="text-xl font-medium text-slate-800">Descrição</h3>
                    <p>
                      {produto.description}
                    </p>
                  </div>
                </div>

                <button type="button" className="w-full py-4 bg-green-500 text-white text-lg hover:bg-green-600 transition">
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