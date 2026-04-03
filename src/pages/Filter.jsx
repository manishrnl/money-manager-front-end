import Dashboards from "../components/Dashboards.jsx";
import {useEffect} from "react";

const Filter = () => {

    useEffect(() => {
        document.title = "Filter Data - Money Manager";
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);
    return (
        <div><Dashboards activeMenu="Filters">
            This is Filter Page
        </Dashboards>
        </div>
    )
}
export default Filter;