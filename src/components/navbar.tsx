import { Search, UserRound, ShoppingBag } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import Product from "@/interfaces/product";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function Navbar() {
    const products: Product[] = useSelector((state: RootState) => state.cart.products)
    function getLengthCartProducts(){
        if(products.length > 9){
            return '9+'
        }
        return products.length.toString()
    }
    return (
        <nav className="h-32 px-2 py-5 flex justify-between items-center md:px-20 md:space-x-4 bg-slate-100">
            <Link href="/" className="w-14 md:w-auto md:h-auto">
                <Logo />
            </Link>
            <div className="flex gap-3 items-center md:gap-5">
                <div className="flex bg-slate-200 h-10 px-2 rounded-lg justify-between md:px-4 md:w-80">
                    <input type="text" placeholder="Quero comprar algo específico..." className="w-full text-slate-800 bg-transparent text-sm outline-none" />
                    <button type="button" className="text-slate-600 hover:scale-110 hover:text-slate-800 transition">
                        <Search />
                    </button>
                </div>

                <button type="button" className="hover:scale-110">
                    <UserRound />
                </button>
                <button type="button" className="hover:scale-110">
                    <Link href="/carrinho" className="relative">
                        <ShoppingBag className="relative"/>
                        {products.length > 0 && (
                                <div className="flex justify-center items-center absolute bg-red-500 text-white rounded-full h-5 w-5 text-whites z-20 -top-2 -right-2 text-[10px]">
                                    <span>
                                    {getLengthCartProducts()}
                                    </span>
                                </div>
                            )}
                    </Link>
                </button>
            </div>
        </nav>
    )
}