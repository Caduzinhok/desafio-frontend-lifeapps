import Image from "next/image"
export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <Image
                src="/not-found.png"
                alt="Product not found"
                className=""
                width={400}
                height={400}
            />
            <p className="text-4xl text-red-800">
                Produto não encontrado!!!
            </p>
        </div>
    )
}