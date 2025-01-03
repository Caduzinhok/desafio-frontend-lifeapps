import Link from "next/link";
import Logo from "./logo";

export default function Footer(){
    return (
        <footer className="px-2 py-5 w-full flex items-center justify-center space-x-4 bg-slate-100 md:px-20 md:justify-between">
            <Link href="/" className="">
                <Logo />
            </Link>
            <div className="flex gap-4">
                <Link href="/" className="hover:text-slate-900 hover:font-semibold">
                    Home
                </Link >
                <Link  href="/" className="hover:text-slate-900 hover:font-semibold">
                    Tênis
                </Link >
                <Link  href="/" className="hover:text-slate-900 hover:font-semibold">
                    Camisetas
                </Link >
                <Link  href="/" className="hover:text-slate-900 hover:font-semibold">
                    Calças
                </Link >
            </div>
        </footer>
    )
}