interface OrderFiltersProps {
    OrderByFilter: (selectedFilter: string) => void
}
export default function OrderFilter({OrderByFilter} : OrderFiltersProps) {
    return (
        <select name="filter-order" id="filter-order" className="w-64 py-2 px-4 border border-slate-500 focus:outline-none" onChange={e => OrderByFilter(e.target.value)}>
            <option value="most-purchased">Mais Comprados</option>
            <option value="highest-price">Maior Preço</option>
            <option value="lowest-price">Menor Preço</option>
        </select>
    )
}