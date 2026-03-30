import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";


const Dashboards = ({children, activeMenu}) => {
    const {user} = useContext(AppContext)
    return (
        <div>
            <Menubar activeMenu={activeMenu}/>
            <div className="flex">
                {user && (
                    <div className="hidden lg:block">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>
                )}
                <div className="grow mx-5">
                    {/* Move children OUTSIDE the {user &&} check for now */}
                    {children}
                </div>
            </div>
        </div>
    )
}
// const Dashboards = ({children, activeMenu}) => {
//     const {user} = useContext(AppContext)
//     return (
//         <div>
//             <Menubar activeMenu={activeMenu}/>
//             {user &&(
//                 <div className="flex">
//                     <div className="max-[1080px]:hidden ">
//                         {/*Sidebar Content*/}
//                         <Sidebar activeMenu={activeMenu}/>
//                     </div>
//                     <div className="grow mx-5 "><p>{children}</p>
//                         {/*Right side Content*/}
//                     </div>
//
//                 </div>
//             )}
//
//         </div>
//     )
// }
export default Dashboards;


