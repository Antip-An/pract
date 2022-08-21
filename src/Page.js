import { Outlet } from "react-router-dom";
import useToken from "./hooks/useToken";

import Name from "./components/Name";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login";

import "./page.css"
import useLoginGuard from "./hooks/useLoginGuard";

const Page = () => {
    useLoginGuard(false, "/login")
    const { loggedIn } = useToken();
    return(
        <div>
            <Name />
            {!loggedIn ? <LoginPage /> : null}
            {loggedIn ? <Header /> : null}
            {loggedIn ? <Outlet /> : null}
            {loggedIn ? <Footer /> : null}
        </div>
    )
};

export default Page;