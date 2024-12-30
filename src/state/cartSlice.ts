import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import Product from '@/interfaces/product'

interface CartState {
    products: Product[]
}

const initialState: CartState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product: Product) => product.id !== action.payload)
        },
        clearCart: (state) => {
            state.products = []
        }
    },

})

export const {addProduct, removeProduct, clearCart} = cartSlice.actions

export default cartSlice.reducer