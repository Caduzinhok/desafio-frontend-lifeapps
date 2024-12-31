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
import ProductDescription from "@/components/product/productDescription";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | undefined>()
  const [isFindProduct, setIsFindProduct] = useState(true)
  const searchParams = useParams();
  const dispatch = useDispatch();
  const productID = searchParams.id

  const priceFormated = () => {
    if (product) {
      let value = product.price
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }
  }

  const promotionalPriceFormated = () => {
    if (product?.promotional_price) {
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
    <div>
      {product ? (
        <div className="min-h-screen h-screen flex flex-col justify-between items-center">
          <Navbar />
          <main className="w-full h-full flex flex-col justify-start items-start py-2 px-4 md:px-20 ">
            <p className="text-lg text-slate-700">
              <Link href="/">Home / Produtos / </Link><span className="font-medium">{product.category}</span>
            </p>
            <ProductDescription 
            handleAddToCart={handleAddToCart}
            priceFormated={priceFormated}
            product={product}
            promotionalPriceFormated={promotionalPriceFormated}
            />
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
    </div>
  )

}