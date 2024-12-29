import Image from "next/image"
export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <Image
                src="/loading.png"
                alt="Product not found"
                className=""
                width={400}
                height={400}
            />
            <p className="text-4xl text-red-800">
                Aguarde enquanto buscamos o seu produto.
            </p>
        </div>
    )
}