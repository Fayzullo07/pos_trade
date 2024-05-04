"use client"
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "react-toastify";
import { productDeleteAPI, productGetAPI } from "@/api/AdminRequest";

const Product = () => {

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            return await productGetAPI();
        }
    });
    const mutationDelete = useMutation(
        {
            mutationFn: async (id: any) => {
                return productDeleteAPI({ id });
            },
            onSuccess: () => {
                queryClient.invalidateQueries(); // Ma'lumotlarni yangilash
                toast.error("Deleted!");
            },
            onError: () => {
                toast.error("Something error!");
            },
        }
    );
    const handeDelete = (id: any) => {
        const isDelete = confirm("O'chirmoqchimisiz?")
        if (isDelete) {
            mutationDelete.mutate(id)
        }
    }
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    return (
        <div>
            <div>
                <div className="relative overflow-x-auto  sm:rounded-lg">
                    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                        <div className="flex w-full max-w-sm items-center space-x-2">
                        </div>
                        <div>

                            <Link href={`/admin/product/add`} >
                                <Button size={"icon"}>
                                    <PlusIcon />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Photo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stattus
                                </th>

                                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.data.products.map((item: any, i: number) => (
                                <tr key={i} >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <Image width={100} height={100} className="h-10 w-10" src={item.photo} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base text-gray-900">{item.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base text-gray-900 font-semibold">{item.price}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base text-gray-900">{item.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-base text-gray-900"><span className={`${item.isActive ? "bg-green-500" : "bg-red-500"} text-white p-1.5 px-2.5 rounded-full`}>{item.isActive ? "Active" : "Disactive"}</span></div>
                                    </td>

                                    <td className="px-6 py-4 text-end  text-sm font-medium">
                                        <Link href={`/admin/product/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => handeDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )).reverse()}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
export default Product;