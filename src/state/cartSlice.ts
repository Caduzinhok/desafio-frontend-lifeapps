import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getCartFromLocalStorage, saveCartToLocalStorage } from '@/utils/localStorage' 
import Product from '@/interfaces/product'

interface CartState {
    products: Product[]
}

const initialState: CartState = {
    products: getCartFromLocalStorage()
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
            saveCartToLocalStorage(state.products)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product: Product) => product.id !== action.payload)
            saveCartToLocalStorage(state.products)
        },
        clearCart: (state) => {
            state.products = []
            saveCartToLocalStorage(state.products)
        }
    },

})

export const {addProduct, removeProduct, clearCart} = cartSlice.actions

export default cartSlice.reducer