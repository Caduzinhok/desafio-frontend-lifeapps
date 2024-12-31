import Product from "@/interfaces/product"
import { Trash2 } from "lucide-react"
import Image from "next/image"
interface ProductCartProps {
    product: Product
    handleRemoveProduct: (id: string) => void
    getQuantityProduct: (product: Product) => string
    getTotalPromotionalPriceProduct: (product: Product) => string
    getTotalPriceProduct: (product: Product) => string
}

export default function ProductCart({ product, handleRemoveProduct, getQuantityProduct, getTotalPromotionalPriceProduct, getTotalPriceProduct }: ProductCartProps) {
    return (
        <div className="flex items-start gap-4 md:gap-8 md:h-52" key={product.id}>
            <Image
                src={product.image}
                alt={product.name}
                className="object-cover md:w-full md:h-full w-20"
                width={400}
                height={350}
            />
            <div className="w-full space-y-6">
                <div className="w-full flex justify-between items-center">
                    <h3 className="font-medium text-xl text-slate-600">
                        {product.name}
                    </h3>
                    <button onClick={e => handleRemoveProduct(product.id)}>
                        <Trash2 className="text-red-500" />
                    </button>
                </div>
                <p>
                    {product.description}
                </p>
                <div className="w-full flex items-end justify-between">
                    <div className="flex items-center justify-center px-4 py-2 rounded-md border border-slate-400">
                        {getQuantityProduct(product)}
                    </div>
                    <span className="text-lg font-medium">
                        {product.promotional_price ? (
                            <span>
                                <span className="line-through text-slate-600 text-sm"> {getTotalPriceProduct(product)}</span>
                                <span className=""> {getTotalPromotionalPriceProduct(product)}</span>
                            </span>
                        ) : (
                            <span>
                                {getTotalPriceProduct(product)}
                            </span>
                        )}
                    </span>
                </div>
            </div>

        </div>
    )
}