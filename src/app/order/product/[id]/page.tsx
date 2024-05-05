"use client"
import { orderPostAPI, productOrderGetAPI } from "@/api/AdminRequest";
import Container from "@/components/Core/Container";
import Modal from "@/components/Core/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function getRandomThreeDigitNumber() {
    return Math.floor(Math.random() * 900) + 100;
}

const Order = ({ params }: { params: any }) => {
    const { id } = params;
    const [orders, setOrders] = useState<any[]>([]);

    const AddProduct = (item: any) => {
        const indexItem = orders.findIndex(orderItem => orderItem.id == item._id);
        let newOrder = [];
        if (indexItem < 0) {
            const newItem = {
                id: item._id,
                photo: item.photo,
                name: item.name,
                price: item.price,
                category: item.category,
                count: 1
            }
            setOrders([...orders, newItem]);
            localStorage.setItem('orders', JSON.stringify([...orders, newItem]));
        } else {
            newOrder = orders.map((orderItem, index) => {
                if (index === indexItem) {
                    return {
                        ...orderItem,
                        count: orderItem.count + 1
                    };
                } else {
                    return orderItem
                }
            })
            setOrders([...newOrder]);
            localStorage.setItem('orders', JSON.stringify(newOrder));
        }
    }

    const totalPrice = orders?.reduce((sum: number, el: any) => {
        // Agar har bir elementda price va count bo'lsa, ularni qo'shib ketamiz
        if (el?.price && el?.count) {
            return sum + el?.price * el?.count;
        } else {
            // Agar price yoki count mavjud emas bo'lsa, summani o'zgartirmaymiz
            return sum;
        }
    }, 0);

    const incrementOrder = (indexItem: number) => {
        let newOrder = orders.map((orderItem, index) => {
            if (index === indexItem) {
                return {
                    ...orderItem,
                    count: orderItem.count == 1 ? 1 : orderItem.count - 1
                };
            } else {
                return orderItem
            }
        })
        setOrders([...newOrder]);
        if (orders !== null) {
            localStorage.setItem('orders', JSON.stringify(newOrder));
        }
    }
    const deleteOrder = (index: number) => {
        let newOrder = orders.filter((item: any, i: number) => i != index);
        setOrders(newOrder);
        if (orders !== null) {
            localStorage.setItem('orders', JSON.stringify(newOrder));
        }
    }


    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => {
            return await productOrderGetAPI({ category: id });
        }
    });
    let localStorageRandom: any = "";
    localStorageRandom = localStorage.getItem('random');
    if (!localStorageRandom) {
        const random_num = getRandomThreeDigitNumber();
        localStorage.setItem('random', JSON.stringify(random_num));
        localStorageRandom = random_num.toString();

    }
    useEffect(() => {
        // Brauzerdagi Local Storage-dan malumotni o'qish
        const localStorageData = localStorage.getItem('orders');
        if (localStorageData) {
            try {
                // Ma'lumotlarni state-ga yuklash
                setOrders(JSON.parse(localStorageData));
            } catch (error) {
                console.error('Error while parsing localStorage data:', error);
            }
        }
    }, [id]);


    const mutation = useMutation(
        {
            mutationFn: async () => {
                return orderPostAPI({ orderNumber: localStorageRandom, orders });
            },
            onSuccess: () => {
                toast.success("Successfully. Wait a minute");
                localStorage.clear()
                setOrders([]);
            }
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;


    const handeOrder = () => {
        const isOrder = confirm(`Do you want to order?\nYour ID number ${localStorageRandom}`)
        if (isOrder) {
            mutation.mutate()
        }
    }

    return (
        <div>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                        {data?.data.map((item: any, i: number) => (

                            <div key={i} className="rounded overflow-hidden">

                                <div className="relative">
                                    <div className="h-56 overflow-hidden">
                                        <Image
                                            src={item.photo}
                                            width={0}
                                            height={0}
                                            className="w-full object-contain"
                                            // className=" transition hover:scale-110 duration-300"
                                            sizes="100vw"
                                            style={{ width: 'auto', height: 'auto' }} // optional
                                            alt="Image"
                                        />

                                        <div
                                            className="bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 hover:bg-gray-500 opacity-25">
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm transition duration-500 ease-in-out">
                                            {item.name}
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            onClick={() => AddProduct(item)}
                                            className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-600 p-2 text-white text-sm">
                                            <PlusIcon />
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 transition duration-500 ease-in-out">
                                            <span className="font-bold">$ {item.price}</span>
                                            <small>Price</small>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div>

                        <div className={`p-4 bg-white col-span-1 sticky top-10 ${orders.length != 0 ? 'border' : "hidden"}`}>
                            <div className="mb-5">
                                <h1 className="text-xl">Your order ID:  <span className="font-bold text-2xl tracking-wider">{localStorageRandom}</span></h1>
                            </div>
                            {orders.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center text-sm mb-2 border-b">

                                    <div>
                                        <div className="flex items-center">
                                            <Image
                                                src={item.photo}
                                                width={0}
                                                height={0}
                                                className="mr-4"
                                                // className=" transition hover:scale-110 duration-300"
                                                sizes="100vw"
                                                style={{ width: '40px', height: 'auto' }} // optional
                                                alt="Image"
                                            />
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                    </div>
                                    <div>${item.price}</div>
                                    <div className="flex items-center justify-between">
                                        <button className="border rounded p-1" onClick={() => incrementOrder(i)}><MinusIcon size={12} /></button>
                                        <span className="p-2">{item.count}</span>
                                        <button className="border rounded p-1" onClick={() => AddProduct({ _id: item.id })}><PlusIcon size={12} /></button>
                                        <div className=" ml-2 cursor-pointer" onClick={() => deleteOrder(i)}><XIcon size={12} /></div>
                                    </div>
                                </div>
                            ))}
                            {orders.length != 0 && (
                                <div className="bg-white  p-2">

                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold">${totalPrice}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">

                                        <button className="bg-blue-500 text-white py-1.5 px-4 rounded-lg mt-4 w-full" onClick={() => {
                                            localStorage.clear();
                                            setOrders([]);
                                        }}>Clear All</button>
                                        <button disabled={mutation.isPending} className="bg-green-500 text-white py-1.5 px-4 rounded-lg mt-4 w-full" onClick={handeOrder}>{!mutation.isPending ? "Order" : "Loading..."}</button>
                                    </div>


                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Order;