import Dashboards from "../components/Dashboards.jsx";
import UseUser from "../hooks/UseUser.jsx";

const Home = () => {
    UseUser();
    return (
        <div><Dashboards activeMenu="Dashboards">
            This is Home Page
        </Dashboards>
        </div>
    )
}
export default Home;