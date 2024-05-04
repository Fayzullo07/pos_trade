"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className={` ${pathname == "/login" ? "hidden" : ""} w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80`}>
            <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
                <div className="relative flex h-16 justify-between">
                    <div className="flex flex-1 items-stretch justify-start">
                        <Link className="flex flex-shrink-0 items-center" href="/">
                            Home
                        </Link>
                    </div>
                    <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
                        <div onClick={() => signOut()} className={` cursor-pointer text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${pathname != "/" ? "hidden" : ""} `}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;