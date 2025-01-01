import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavigationOptionsProps {
    lastPage: () => void
    nextPage: () => void
    currentPage: number
    totalPages: number
}
export default function NavigationOptions({lastPage, nextPage, currentPage, totalPages}: NavigationOptionsProps) {
    return (
        <div className="flex w-full items-center justify-center gap-4">
            <button
                onClick={lastPage}
                className={`p-2 ${currentPage === 1 ? "bg-slate-300" : "bg-slate-800"}`} disabled={currentPage === 1 ? true : false}
            >
                <ArrowLeft className="size-6 text-white" />
            </button>

            <span className="text-2xl font-medium p-2">{currentPage.toString()}</span>

            <button
                className={`p-2 ${currentPage === totalPages ? "bg-slate-300" : "bg-slate-800"}`} disabled={currentPage === totalPages ? true : false}
                onClick={nextPage}
            >
                <ArrowRight className="size-6 text-white" />
            </button>
        </div>
    )
}