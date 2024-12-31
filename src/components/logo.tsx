import Image from "next/image"
export default function Logo(){
    return (
        <Image src="/logo.jpg" alt="Logo" width={60} height={60} className="W-12 h-12 md:w-full md:h-full rounded-md" />
    )
}