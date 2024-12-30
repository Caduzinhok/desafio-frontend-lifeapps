import Product from "@/interfaces/product";

export const saveCartToLocalStorage = (cartItems: Product[]) => {
    // Salvar dados como string no localStorage.
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
}

export const getCartFromLocalStorage = () => {
    try{
        const storedCart = localStorage.getItem('cart');
        
        // Se possuir informações, retorna um JSON de Produtos, senão, retornar lista VAZIAS.
        return storedCart ? JSON.parse(storedCart) : [];
    }catch{
        return [];
    }
        

}