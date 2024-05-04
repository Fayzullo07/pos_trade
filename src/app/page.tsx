import AuthProvider from "@/components/Core/AuthProvider";
import HomePage from "@/components/HomePage";
import { auth } from "@/configs/auth";
// import { redirect } from "next/navigation";

const Home =  () => {

  // const session = await auth()
  // if (session?.user) {
  //   session.user = {
  //     ...session.user,
  //   }
  // }
  return (
    // <AuthProvider session={session}>
      <HomePage />
    // </AuthProvider>
  )
}

export default Home;