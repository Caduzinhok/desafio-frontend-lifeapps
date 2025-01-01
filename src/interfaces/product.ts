export default interface Product{
    id: string
    name: string
    description: string
    category: string
    price: number
    discount_percentage?: number
    image: string
    promotional_price?: number
}