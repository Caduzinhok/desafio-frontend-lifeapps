"use client"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Product from "@/interfaces/product";
import { useCart } from "@/utils/cartManagement";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
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
      } = useCart();
      
    // Função para obter produtos únicos
    const removeDuplicateProducts = (): Product[] => {
        const result: Product[] = [];

        // Usando `some` para verificar se o produto já existe no resultado
        for (const item of products) {
            if (!result.some((product) => product.id === item.id)) {
                result.push(item);
            }   
        }

        return result;
    };

    const uniqueProducts = removeDuplicateProducts()


    return (
        <div className="h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex flex-col w-full h-full px-20 py-4">
                <p className="text-lg text-slate-700">
                    <Link href="/">Home / </Link><span className="font-medium">Carrinho</span>
                </p>
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2 space-y-4">
                        <h1 className="text-4xl font-semibold">Carrinho</h1>
                        <p className="text-lg text-slate-700">Total Produtos:
                            <span className="text-black font-medium"> {products.length}</span>
                        </p>

                        <div className="flex flex-col gap-4 pr-6 max-h-[500px] overflow-y-auto ">
                            {uniqueProducts && (
                                uniqueProducts.map((product) => {
                                    return (
                                        <div className="flex items-start gap-8 h-48" key={product.id}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                className="object-cover w-full h-full"
                                                width={400}
                                                height={300}
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
                                })
                            )}
                        </div>
                    </div>


                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-medium">RESUMO</h2>
                        <div className="flex w-full justify-between items-center text-slate-600">
                            <p>Subtotal de produtos</p>
                            <span className="text-lg">
                                {getFullValueProducts()}
                            </span>
                        </div>
                        <div className="flex w-full justify-between items-center text-slate-600">
                            <p>Desconto</p>
                            <span className="text-lg">
                                {getFullDiscountAmount()}
                            </span>
                        </div>
                        <div className="w-full h-px bg-slate-400" />

                        <div className="flex w-full justify-between items-center text-slate-900 text-xl">
                            <p>Total a pagar</p>
                            <span className="font-semibold">
                                {getFullValuePayable()}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button 
                            onClick={e => handleClearCart()}
                            className="w-full py-2 bg-red-500 text-white">
                                LIMPAR CARRINHO
                            </button>
                            <button className="w-full py-2 bg-green-500 text-white">
                                FINALIZAR COMPRA
                            </button>

                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}