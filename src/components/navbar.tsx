import { Search, UserRound, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Logo from "./logo";

export default function Navbar() {
    return (
        <nav className="w-full px-20 py-5 flex justify-between items-center space-x-4 bg-slate-200">
            <Logo />

            <div className="flex gap-5 items-center">
                <div className="bg-white h-10 w-80 rounded-lg flex px-4 justify-between">
                    <input type="text" placeholder="Quero comprar algo específico..." className="w-full text-slate-700 bg-transparent text-sm outline-none" />
                    <button type="button" className="text-slate-600 hover:scale-110 hover:text-slate-800 transition">
                        <Search />
                    </button>
                </div>

                <button type="button" className="hover:scale-110">
                    <UserRound />
                </button>
                <button type="button" className="hover:scale-110">
                    <ShoppingBag />
                </button>
            </div>
        </nav>
    )
}