import Dashboards from "../components/Dashboards.jsx";
import {useEffect} from "react";

const Expense = () => {

    useEffect(() => {
        document.title = "Expense - Money Manager";
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [])
    return (
        <div><Dashboards activeMenu="Expense">
            This is Expense Page
        </Dashboards>
        </div>
    )
}
export default Expense;