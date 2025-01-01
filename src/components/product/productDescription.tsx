import Product from "@/interfaces/product"
import { Heart } from "lucide-react"
import Image from "next/image"
interface ProductDescriptionProps {
    product: Product
    formatValueAsCurrency: (value: Number) => string | undefined
    handleAddToCart: () => void
}
export default function ProductDescription({product, formatValueAsCurrency, handleAddToCart}: ProductDescriptionProps){
    return (
        <div className="py-4 grid gap-4 md:gap-20 w-full md:grid-cols-2 md:px-10">
        <Image
          src={product.image}
          alt="Product not found"
          className="h-auto object-contain max-h-[500px]"
          width={600}
          height={500}
        />
        <div className="flex flex-col justify-between w-full gap-4 md:gap-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-semibold text-slate-800">{product.name}</h1>
              <button>
                <Heart />
              </button>
            </div>

            <div className="text-2xl text-red-500 font-medium product-price">
              {product.promotional_price ? (
                <p>
                  <span className="text-lg text-slate-500 line-through">{formatValueAsCurrency(product.price)}</span>
                  <span> {formatValueAsCurrency(product.promotional_price)}</span>
                </p>
              ) : (
                <span>
                  {formatValueAsCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="">
              <h3 className="text-xl font-medium text-slate-800">Descrição</h3>
              <p>
                {product.description}
              </p>
            </div>
          </div>

          <button
            id="add-to-cart"
            onClick={handleAddToCart}
            type="button"
            className="w-full py-4 bg-green-500 text-white text-lg hover:bg-green-600 transition">
            ADICIONAR AO CARRINHO
          </button>
        </div>

      </div>
    )
}