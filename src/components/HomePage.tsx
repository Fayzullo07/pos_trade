"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import SessionData from "./SessionData";

const HomePage = () => {
  const data = [
    {
      slug: '/chef',
      name: "Chef"
    },
    {
      slug: '/order',
      name: "Menu"
    },
    {
      slug: '/orders',
      name: "Order Numbers"
    },
    {
      slug: '/login',
      name: "Login"
    },
    {
      slug: '/admin',
      name: "Admin"
    }
  ]

  // const { data: session, status } = useSession()

  // useEffect(() => {
  //   router.push("/login")
  // }, [])

  return (

    <div className="h-screen flex items-center justify-center">
      <div className=" text-white font-bold text-lg text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((item, i) => (
          <Link key={i} href={item.slug}>
            <div className="border p-10 rounded-md bg-blue-400 cursor-pointer">{item.name}</div>
          </Link>
        ))}
      </div>
      <div>

        {/* {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <SessionData session={session} />
        )} */}
      </div>
    </div>
  )
}

export default HomePage;