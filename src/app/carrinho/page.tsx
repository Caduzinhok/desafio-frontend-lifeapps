import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function CartPage() {
    return (
        <div className="h-screen min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex flex-col w-full h-full px-20 py-8">
                <p className="text-lg text-slate-700">
                    <Link href="/">Home / </Link><span className="font-medium">Carrinho</span>
                </p>
                <div className="grid grid-cols-3">
                    <div className="col-span-2">
                        <h1 className="text-4xl font-semibold">Carrinho</h1>
                        <p className="text-lg text-slate-700">Total Produtos:
                            <span className="text-black font-medium"> 12</span>
                        </p>
                        <div className="col-span-1">
                            {/* Aqui vou adicionar a lógica de itens conforme clicar em adicionar ao carrinho */}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-medium">RESUMO</h2>
                        <div className="flex w-full justify-between items-center text-slate-600">
                            <p>Subtotal de produtos</p>
                            <span className="text-lg">
                                R$ 689,00
                            </span>
                        </div>
                        <div className="flex w-full justify-between items-center text-slate-600">
                            <p>Desconto</p>
                            <span className="text-lg">
                                R$ -189,00
                            </span>
                        </div>
                        <div className="w-full h-px bg-slate-400" />

                        <div className="flex w-full justify-between items-center text-slate-900 text-xl">
                            <p>Total a pagar</p>
                            <span className="font-semibold">
                                R$ 400,00
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button className="w-full py-2 bg-red-500 text-white">
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