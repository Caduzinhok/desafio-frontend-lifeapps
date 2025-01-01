import Product from "@/interfaces/product";
import { clearCart, removeProduct } from "@/state/cartSlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
    const products: Product[] = useSelector((state: RootState) => state.cart.products);
    const dispatch = useDispatch();

    const handleRemoveProduct = (id: string) => {
        dispatch(removeProduct(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const getTotalPriceProduct = (product: Product) => {
        const total = Number(product.price) * products.filter((item) => item.id === product.id).length;
        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
    };

    const getTotalPromotionalPriceProduct = (product: Product) => {
        const total = Number(product.promotional_price) * products.filter((item) => item.id === product.id).length;
        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
    };


    const getQuantityProduct = (product: Product) => {
        return products.filter((item) => item.id === product.id).length.toString();
    };

    const getFullValuePayable = ():string => {
        let total = 0;
        products.forEach((product) => {
            total += product.promotional_price ? Number(product.promotional_price) : Number(product.price);
        });
        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
    };

    const getFullValueProducts = ():string  => {
        let total = 0;
        products.forEach((product) => {
            total += Number(product.price);
        });

        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });

    }

    const getFullDiscountAmount = ():string => {
        let total = 0;
        products.forEach((product) => {
            if(product.promotional_price){

                total += Number(product.price) - Number(product.promotional_price);
            }
        });

        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
    }

        // Função para obter produtos únicos
        const removeDuplicateProducts = (products: Product[]): Product[] => {
            const result: Product[] = [];
    
            if(!products){
                return result
            }
            // Usando `some` para verificar se o produto já existe no resultado
            for (const item of products) {
                if (!result.some((product) => product.id === item.id)) {
                    result.push(item);
                }
            }
    
            return result;
        }

    return {
        products,
        handleRemoveProduct,
        handleClearCart,
        getTotalPriceProduct,
        getTotalPromotionalPriceProduct,
        getQuantityProduct,
        getFullValuePayable,
        getFullValueProducts,
        getFullDiscountAmount,
        removeDuplicateProducts,
    };
};