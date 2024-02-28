import { Outlet } from "react-router-dom";
import Header from "../component/single/Header";
import Footer from "../component/single/Footer";
import { usePopupContext } from "../context/PopupContext";

const MainLayout = () => {
    const {
        isLoginPopupOpen,
        closeLoginPopup,
        closeSignupPopup,
        isBackdropOpen,
    } = usePopupContext();

    return (
        <section className="flex flex-col relative  min-h-screen">
            {isBackdropOpen && (
                <div
                    className="absolute bg-black/50 w-full h-full z-20"
                    onClick={
                        isLoginPopupOpen ? closeLoginPopup : closeSignupPopup
                    }
                />
            )}

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
