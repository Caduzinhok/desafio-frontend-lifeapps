"use client"
import Product from '@/interfaces/product'
import Image from "next/image";
import Link from 'next/link';

export default function ProductCard(props: Product) {
    return (
        <Link className="basis-1/4"
            href={{
                pathname: `/produtos/${props.category}/${props.id}`,
            }}
        >
            <div className="flex flex-col space-y-4 items-center">

                <div className="relative w-full h-96">
                    {props.image && (
                        <Image
                            src={props.image}
                            alt={props.name}
                            className="object-cover w-full h-full"
                            width={400}
                            height={300}
                        />
                    )}

                </div>
                <p className="text-xl text-slate-900">{props.name}</p>
                {props.promotional_price ? (
                    <div className="space-x-4">
                        <span className="line-through text-slate-600">R$ {props.price.toString()}</span>
                        <span className="">R$ {props.promotional_price.toString()}</span>
                    </div>
                ) : (
                    <span className="text-black">R$ {props.price.toString()}</span>
                )}

            </div>
        </Link>
    )
}