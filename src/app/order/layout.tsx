"use client"
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { categoryOrderGetAPI } from "@/api/AdminRequest";
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return await categoryOrderGetAPI();
        }
    });
    function probel(text: any) {
        return text.replace(/\s/g, '=');
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div className='grid grid-cols-1  md:grid-cols-3 lg:grid-cols-8'>
            <div className="py-8 px-2">
                <div className='col-span-1 sticky top-10'>
                    <ul className='text-gray-500 font-semibold gap-2'>

                        {data?.data.categories.map((item: any, i: number) => (
                            <li key={i} className="border-b border-green-500 rounded-full">
                                <Link href={`/order/product/${item.name}`} className=' rounded-full flex  px-3 py-2 hover:text-black hover:bg-gray-50 transition-all'>
                                    <span className='flex items-center gap-3'>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div className='py-8 col-span-7 '>
                {children}
            </div>
        </div>
    );
}
