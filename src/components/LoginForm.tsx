"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerPostAPI } from "@/api/AuthRequest";
import { signIn } from "next-auth/react";

const LoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const mutationRegister = useMutation(
        {
            mutationFn: async () => {
                return registerPostAPI(formData);
            },
            onSuccess: () => {
                router.push("/admin");
            }
        }
    );
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.login || !formData.password) {
            setError("All fields are necessary!");
            return
        }
        try {
            const res = await signIn("credentials", {
                login: formData.login,
                password: formData.password,
                redirect: false
            });
            // console.log(res);
            

            if (res?.error) {
                setError("Invalid Credentials");
                setLoading(false);
                return;
            }
            setLoading(false);
            router.replace("/");
        } catch (error) {
            setLoading(false);
            console.log(error);

        }
        // mutationRegister.mutate();
        // const user: { account_type: string } = {
        //   account_type: "order_process"
        // }
        // localStorage.setItem('user', JSON.stringify(user))
        // router.push("/admin");
    };
    return (
        <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Welcome to My System</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="login">
                            Login
                        </label>
                        <input
                            id="login"
                            name="login"
                            value={formData.login}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-400"
                            type="text" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-400"
                            type="password" required />
                    </div>
                    {error && (

                        <div className="p-1 px-4 inline-block text-white text-base tracking-wider bg-red-500 rounded-full">{error}</div>
                    )}
                    <div>
                        <button disabled={loading} type="submit" className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg">
                            {!loading ? "Login" : "Loading..."}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;