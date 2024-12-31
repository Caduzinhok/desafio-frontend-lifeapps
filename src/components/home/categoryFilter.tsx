import CategoryFilterInterface from "@/interfaces/categoryFilter"

interface CategoryFilterProps {
    arrayCategoryFilters: CategoryFilterInterface[]
    filterProductsByCategory: (categoryName: string) => void
}

export default function CategoryFilter({arrayCategoryFilters, filterProductsByCategory} : CategoryFilterProps){
    return (
        <div className="flex flex-col w-full px-2 gap-4 justify-between items-center md:gap-8 md:flex-row md:px-20">
          {arrayCategoryFilters.map((categoryFilter) => {
            return (
              <div key={categoryFilter.name} className="w-full">
                <button
                  onClick={() => filterProductsByCategory(categoryFilter.name)}
                  className={`min-w-64 w-full py-4 text-lg text-center border border-slate-500 shadow-sm shadow-slate-500 transition hover:bg-slate-500 hover:text-white ${categoryFilter.selected && 'bg-slate-500 text-white'}`}>
                  {categoryFilter.name}
                </button>
              </div>
            )
          })}
        </div>
    )
}