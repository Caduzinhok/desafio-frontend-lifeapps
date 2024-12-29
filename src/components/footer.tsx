import Logo from "./logo";

export default function Footer(){
    return (
        <footer className="w-full px-20 py-5 flex justify-between items-center space-x-4 bg-slate-100">
            <Logo />
            <div className="flex gap-4">
                <a href="/" className="hover:text-slate-900 hover:font-semibold">
                    Home
                </a>
                <a href="/" className="hover:text-slate-900 hover:font-semibold">
                    Tênis
                </a>
                <a href="/" className="hover:text-slate-900 hover:font-semibold">
                    Camisetas
                </a>
                <a href="/" className="hover:text-slate-900 hover:font-semibold">
                    Calças
                </a>
            </div>
        </footer>
    )
}