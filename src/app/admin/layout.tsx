import Container from "@/components/Core/Container";
import { auth } from "@/configs/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const data_links = [
        {
            slug: "/",
            title: "Category",
        },
        {
            slug: "/product",
            title: "Product",
        }
    ]

    // const session = await auth();
    // if (!session) redirect("/login");

    return (
        <div className=''>

            <div className=''>
                <ul className='text-gray-500 font-semibold flex gap-2'>

                    {data_links.map((item, i) => (
                        <li key={i} className="">
                            <Link href={`/admin/${item.slug}`} className='flex rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all'>
                                <span className='flex items-center gap-3'>
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
            <div className='py-6'>
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    );
}
