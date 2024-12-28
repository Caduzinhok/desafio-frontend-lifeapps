import { Search, UserRound, ShoppingBag } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <nav className="px-12 py-5 flex justify-between items-center">
      <Image src="/logo.png" alt="Logo" width={80} height={80}/>

      <div className="flex gap-5 items-center">
        <div className="bg-slate-200 h-10 w-80 rounded-lg flex px-4 justify-between">
          <input type="text" placeholder="Quero comprar algo específico..." className="w-full text-slate-700 bg-transparent text-sm outline-none" />
          <button type="button">
            <Search />
          </button>
        </div>

        <UserRound/>
        <ShoppingBag/>
      </div>
    </nav>
  );
}
