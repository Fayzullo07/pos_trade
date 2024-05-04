"use client"
import { categoryGetOneAPI, categoryPutAPI } from "@/api/AdminRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const EditCategory = ({ params }: { params: any }) => {
    const { id } = params;
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        isActive: true
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const { data, isError, isLoading } = useQuery({
        queryKey: ["category", id],
        queryFn: async () => {
            return await categoryGetOneAPI({ id });
        },

    });
    const mutation = useMutation(
        {
            mutationFn: async () => {
                return categoryPutAPI(formData, id);
            },
            onSuccess: () => {
                router.push(`/admin`)
            }
        }
    );

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.data.category.name,
                isActive: data.data.category.isActive
            });
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Xatolik yuz berdi...</div>;

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!formData.name) {
            toast.warning("Name");
            return;
        }

        mutation.mutate();
    };

    return (
        <div className="shadow p-4 bg-white rounded-xl">
            <div className="mb-5 grid grid-cols-1 md:gap-8">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Category Name</label>
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
                {!mutation.isPending ? "Update" : "Loading . . ."}
            </button>

        </div>

    )
}

export default EditCategory;