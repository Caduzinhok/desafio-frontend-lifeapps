"use client"
import { Search, UserRound, ShoppingBag } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import Product from "@/interfaces/product";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";

export default function Navbar() {
    const products: Product[] = useSelector((state: RootState) => state.cart.products)

    const [cartLength, setCartLength] = useState<string | null>(null);

    useEffect(() => {
        // Garante que essa lógica rode apenas no cliente
        if (products.length > 9) {
            setCartLength('9+');
        } else {
            setCartLength(products.length.toString());
        }
    }, [products.length]);
    
    return (
        <nav className="h-32 px-2 py-5 w-full flex justify-center items-center md:px-20 space-x-4 bg-slate-100 md:justify-between ">
            <Link href="/" className="">
                <Logo />
            </Link>
            <div className="flex gap-3 items-center md:gap-5">
                <div className="flex bg-slate-200 h-10 px-2 rounded-lg justify-between md:px-4 md:w-80">
                    <input type="text" placeholder="Quero comprar algo específico..." className="w-full text-slate-800 bg-transparent text-sm outline-none" />
                    <button type="button" className="text-slate-600 hover:scale-110 hover:text-slate-800 transition">
                        <Search />
                    </button>
                </div>

                <button className="hover:scale-110">
                    <UserRound />
                </button>

                <Link href="/carrinho" className="relative hover:scale-110 cart-icon">
                    <ShoppingBag className="relative" />
                    <div>
                        {cartLength && (
                            <div
                            id="cart-quantity" 
                            className="flex justify-center items-center absolute bg-red-500 text-white rounded-full h-5 w-5 text-whites z-20 -top-2 -right-2 text-[10px]">
                                <span>
                                    {cartLength}
                                </span>
                            </div>

                        )}
                    </div>
                </Link>
            </div>
        </nav>
    )
}