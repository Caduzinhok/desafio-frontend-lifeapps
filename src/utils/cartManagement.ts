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

    const getFullValuePayable = () => {
        let total = 0;
        products.forEach((product) => {
            total += product.promotional_price ? Number(product.promotional_price) : Number(product.price);
        });
        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
    };

    const getFullValueProducts = () => {
        let total = 0;
        products.forEach((product) => {
            total += Number(product.price);
        });

        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });

    }

    const getFullDiscountAmount = () => {
        let total = 0;
        products.forEach((product) => {
            if(product.promotional_price){

                total += Number(product.price) - Number(product.promotional_price);
            }
        });

        return total.toLocaleString("pt-BR", { currency: "BRL", style: "currency" });
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
    };
};