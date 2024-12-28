import Navbar from "@/components/navbar";
import Image from "next/image";

const filters = [
  'Todos os Produtos',
  'Tênis',
  'Camisetas',
  'Calças'
]

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="space-y-8 w-screen">
        <div className="w-screen h-96 overflow-hidden relative">
          <Image
            src="/background-image.jpg"
            alt="Main image about shopping"
            layout="fill"  // Usa 100% do contêiner
            objectFit="cover"  // Controla o ajuste da imagem dentro do contêiner
          />
        </div>

        <h2 className="w-full text-center text-3xl font-semibold">
            Conheça nossos produtos
          </h2>
        
        <div className="flex w-full px-20 justify-between items-center gap-8">
          {filters.map((option) => {
            return (
              <div key={option} className="w-full">
                <button 
                className="min-w-64 w-full py-4 text-lg text-center border border-slate-500 shadow-sm shadow-slate-500 transition hover:bg-slate-500 hover:text-white">
                  {option}
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between items-center w-full px-20">
          <span className="text-lg font-medium">
            10 Produtos
          </span>

          <select name="filter-order" id="filter-order" className="w-64 py-2 px-4 border border-slate-500 focus:outline-none ">
            <option value="">Opção 1</option>
            <option value="">Opção 2</option>
            <option value="">Opção 3</option>
            <option value="">Opção 4</option>
            <option value="">Opção 5</option>

          </select>
        </div>
      </main>
    </div>
  );
}
