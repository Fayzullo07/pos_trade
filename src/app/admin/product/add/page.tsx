"use client"
import { categoryGetAPI, productPostAPI } from "@/api/AdminRequest";
import UploadImage from "@/utils/UploadImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";


const AddProduct = () => {
    const router = useRouter();
    const [isPicker, setIsPicker] = useState(false);
    const [formData, setFormData] = useState({
        photo: "",
        name: "",
        price: 0,
        category: "",
        isActive: true
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const setURLPhoto = (url: string) => {
        setFormData({ ...formData, photo: url });
    }

    const mutation = useMutation(
        {
            mutationFn: async () => {
                return productPostAPI(formData);
            },
            onSuccess: () => {
                router.push(`/admin/product`)
            }
        }
    );

    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return await categoryGetAPI();
        }
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.photo) {
            toast.warning("Photo");
            return;
        }

        if (!formData.name) {
            toast.warning("Name");
            return;
        }

        if (!formData.price) {
            toast.warning("Price");
            return;
        }

        if (!formData.category) {
            toast.warning("Category");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="shadow p-4 bg-white rounded-xl">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Product Photo</label>
                {!formData.photo ? (

                    <div
                        className="container border-[5px] border-dashed border-green-500 cursor-pointer flex justify-center p-8"
                        onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
                        title="Choose Image"
                    >
                        <ImageIcon size={"50"} strokeWidth={1} />
                    </div>
                ) : (
                    <div className="border-[5px] border-dashed border-green-500 min-h-10 relative p-1">
                        <div className="absolute right-0">
                            <XIcon className=" cursor-pointer" onClick={() => setFormData({ ...formData, photo: "" })} />
                        </div>

                        <div className="max-w-xl h-auto mx-auto flex justify-center">
                            <Image
                                src={formData.photo}
                                width={0}
                                height={0}
                                // className=" transition hover:scale-110 duration-300"
                                sizes="100vw"
                                style={{ width: 'auto', height: 'auto' }} // optional
                                alt="Image"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter category name . . ."
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter product price . . ."
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value })
                        }}
                        id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                        <option value={""}>Choose...</option>
                        {data?.data.map((item: any, i: number) => (
                            <option key={i} value={item.name}>{item.name}</option>
                        ))}

                    </select>
                </div>
                <div className="mb-5">
                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                        Active
                    </label>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                            <input type="radio" name="radio1" id="radioButton1" className="h-5 w-5"
                                checked={formData.isActive === true}
                                onChange={() => setFormData({ ...formData, isActive: !formData.isActive })}
                            />
                            <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">
                                Yes
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" name="radio1" id="radioButton2" className="h-5 w-5"
                                checked={formData.isActive === false}
                                onChange={() => setFormData({ ...formData, isActive: !formData.isActive })}
                            />
                            <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">
                                No
                            </label>
                        </div>
                    </div>
                </div>

            </div>


            <button
                disabled={mutation.isPending}
                onClick={handleSubmit}
                className="text-white bg-blue-500 hover:scale-90 duration-300 font-medium rounded-lg text-sm  px-5 py-2.5"
            >
                {!mutation.isPending ? "Add" : "Loading . . ."}
            </button>
            {/* FileStack */}
            {isPicker && (
                <UploadImage
                    setIsPicker={setIsPicker}
                    setURL={setURLPhoto}
                />
            )}

        </div>
    )
}

export default AddProduct;