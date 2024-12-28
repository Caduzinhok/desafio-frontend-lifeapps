import { Search, UserRound, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="px-12 py-5 flex justify-between items-center space-x-4">
            <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="rounded-md" />

            <div className="flex gap-5 items-center">
                <div className="bg-slate-200 h-10 w-80 rounded-lg flex px-4 justify-between">
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