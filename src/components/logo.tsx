import Image from "next/image"
export default function Logo(){
    return (
        <Image src="/logo.jpg" alt="Logo" width={80} height={80} className="w-auto h-auto rounded-md" />
    )
}