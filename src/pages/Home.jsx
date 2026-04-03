import Dashboards from "../components/Dashboards.jsx";
import UseUser from "../hooks/UseUser.jsx";
import {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        document.title = "Home - Money Manager";
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);
    UseUser();
    return (
        <div><Dashboards activeMenu="Dashboards">
            This is Home Page
        </Dashboards>
        </div>
    )
}
export default Home;