import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { auth } from "@/configs/auth";

const Login = async () => {
    const session = await auth();
    if (session) redirect("/");


    return <LoginForm />
}

export default Login;