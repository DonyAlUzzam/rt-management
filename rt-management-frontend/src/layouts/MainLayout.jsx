import {

    Sidebar,

    Navbar,

    Footer

} from "@/components/layout";

export default function MainLayout({

    children

}) {

    return (

        <div className="flex bg-gray-100">

            <Sidebar />

            <div className="ml-64 flex-1 min-h-screen">

                <Navbar />

                <main className="p-8">

                    {children}

                    <Footer />

                </main>

            </div>

        </div>

    );

}