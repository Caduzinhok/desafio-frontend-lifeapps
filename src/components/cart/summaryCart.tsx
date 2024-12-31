interface SummaryCartProps {
    getFullValueProducts: () => string
    getFullDiscountAmount: () => string
    getFullValuePayable: () => string
    handleClearCart: () => void
}
export default function SummaryCart({ getFullDiscountAmount, getFullValuePayable, getFullValueProducts, handleClearCart }: SummaryCartProps) {
    return (
        <div className="flex w-full items-center justify-center md:items-start md:justify-start flex-col gap-4">
            <h2 className="text-2xl font-medium">RESUMO</h2>
            <div className="flex w-full justify-between items-center text-slate-600">
                <p>Subtotal de produtos</p>
                <span className="text-lg">
                    {getFullValueProducts()}
                </span>
            </div>
            <div className="flex w-full justify-between items-center text-slate-600">
                <p>Desconto</p>
                <span className="text-lg">
                    {getFullDiscountAmount()}
                </span>
            </div>
            <div className="w-full h-px bg-slate-400" />

            <div className="flex w-full justify-between items-center text-slate-900 text-xl">
                <p>Total a pagar</p>
                <span className="font-semibold">
                    {getFullValuePayable()}
                </span>
            </div>

            <div className="flex w-full gap-2">
                <button
                    onClick={e => handleClearCart()}
                    className="w-full py-2 bg-red-500 text-white">
                    LIMPAR CARRINHO
                </button>
                <button className="w-full py-2 bg-green-500 text-white">
                    FINALIZAR COMPRA
                </button>

            </div>

        </div>
    )
}