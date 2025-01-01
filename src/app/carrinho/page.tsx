"use client"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProductCart from "@/components/cart/productCart";
import SummaryCart from "@/components/cart/summaryCart";
import Product from "@/interfaces/product";
import { useCart } from "@/utils/cartManagement";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [productsCart, setProductsCart] = useState<Product[]>()
    const [uniqueProducts, setUniqueProducts] = useState<Product[]>()
    const {
        products,
        handleRemoveProduct,
        handleClearCart,
        getTotalPriceProduct,
        getTotalPromotionalPriceProduct,
        getQuantityProduct,
        getFullValuePayable,
        getFullValueProducts,
        getFullDiscountAmount,
        removeDuplicateProducts,
    } = useCart();

    useEffect(() => {
        setProductsCart(products)
        setUniqueProducts(removeDuplicateProducts(products))
    }, [products])


    return (
        <div className="md:h-screen flex space-y-2 flex-col justify-between">
            <Navbar />
            <main className="flex flex-col gap-2 w-full h-full py-4 px-4 md:px-20">
                <p className="text-lg text-slate-700">
                    <Link href="/">Home / </Link><span className="font-medium">Carrinho</span>
                </p>
                <div className="md:grid space-y-10 md:grid-cols-3 gap-10">
                    <div className="col-span-2 space-y-4">
                        <h1 className="text-4xl font-semibold">Carrinho</h1>
                        <p className="text-lg text-slate-700">Total Produtos:
                            <span className="text-black font-medium"> {productsCart && productsCart.length}</span>
                        </p>

                        <div className="flex flex-col gap-4 pr-6 md:max-h-[500px] md:overflow-y-auto ">
                            {uniqueProducts  && (
                                uniqueProducts.map((product) => {
                                    return (
                                        <div key={product.id}>
                                            <ProductCart
                                                getQuantityProduct={getQuantityProduct}
                                                getTotalPriceProduct={getTotalPriceProduct}
                                                getTotalPromotionalPriceProduct={getTotalPromotionalPriceProduct}
                                                handleRemoveProduct={handleRemoveProduct}
                                                product={product}
                                            />
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    
                    {productsCart && (
                        <SummaryCart
                        getFullDiscountAmount={getFullDiscountAmount}
                        getFullValuePayable={getFullValuePayable}
                        getFullValueProducts={getFullValueProducts}
                        handleClearCart={handleClearCart}
                    />
                    )}

                </div>
            </main>
            <Footer />
        </div>
    )
}