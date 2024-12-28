export default interface Product{
    id: string
    name: string
    description: string
    category: string
    price: Number
    discount_percentage?: Number
    image: string
    promotional_price?: Number
}