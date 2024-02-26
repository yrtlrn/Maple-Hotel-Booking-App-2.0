import { Outlet } from "react-router-dom";
import Header from "../component/single/Header";
import Footer from "../component/single/Footer";

const MainLayout = () => {
    return (
        <section className="flex flex-col  min-h-screen">
            <header className="border-b-2 p-2 mb-2 flex-none">
                <Header />
            </header>
            <main className="container mx-auto flex flex-1 mb-4  ">
                <section className="flex-1 ">
                    <Outlet />
                </section>
            </main>
            <footer className="flex-none">
                <Footer />
            </footer>
        </section>
    );
};
export default MainLayout;
