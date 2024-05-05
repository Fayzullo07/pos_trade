"use client"
import { chefGetAPI, chefPatchAPI } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";


const Chef = () => {
    const [patchData, setPatchData] = useState({
        isFinished: Boolean,
        isActive: Boolean,
        orderNumber: ""
    });

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["orderschef"],
        queryFn: async () => {
            return await chefGetAPI();
        },
        refetchInterval: 2000
    });

    const mutationPatch = useMutation(
        {
            mutationFn: async (id: any) => {
                return chefPatchAPI(patchData, id);
            },
            onSuccess: () => {
                refetch();
                toast.success("Changed");
            }
        }
    );
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const PatchData = (id: any, isFinished: any, isActive: any, orderNumber: any) => {
        setPatchData({
            isFinished,
            isActive,
            orderNumber
        })
        mutationPatch.mutate(id);
    }
    return (
        <div>
            <Container>
                <div className="mb-5 p-2">
                    {data?.data.map((item: any, i: number) => (
                        <div key={i} className=" mb-5 ">

                            <table className="min-w-full divide-y rounded-lg border border-blue-500 divide-gray-200 overflow-x-auto">
                                <thead className="bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <b className="p-2 text-2xl">#{item.orderNumber}</b>
                                        </div>
                                        <div className="flex">
                                            {item.isActive && (
                                                <button
                                                    disabled={mutationPatch.isPending}
                                                    onClick={() => {
                                                        PatchData(item._id, item.isFinished, !item.isActive, item.orderNumber)
                                                    }}
                                                    className={`p-2 px-4 border text-base ${!mutationPatch.isPending && "hover:border-red-500 hover:text-red-500"}  `}>{!mutationPatch.isPaused ? "Delete" : "Loading..."}</button>
                                            )}
                                            {!item.isFinished && (
                                                <button
                                                    onClick={() => {
                                                        PatchData(item._id, !item.isFinished, item.isActive, item.orderNumber)
                                                    }}
                                                    disabled={mutationPatch.isPending}
                                                    className={`p-2 px-4 border text-base ${!mutationPatch.isPending && "hover:border-green-500 hover:text-green-500"}  `}>{!mutationPatch.isPaused ? "Finish" : "Loading..."}</button>
                                            )}
                                        </div>
                                    </div>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Photo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Category
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Count
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Price
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {item.orders.map((order: any, i: number) => (
                                        <tr key={i} >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <Image width={100} height={100} className="h-10 w-10" src={order.photo} alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-base text-gray-900">{order.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-base text-gray-900">{order.category}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="text-base text-gray-900 font-semibold">{order.count}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end">
                                                <div className="text-base text-gray-900">${order.price}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )).reverse()}
                    <div>

                    </div>
                </div>

            </Container>
        </div>
    )
}

export default Chef;