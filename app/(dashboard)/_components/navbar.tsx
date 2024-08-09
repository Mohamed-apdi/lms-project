import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"


export const Navbar = () => {
    return (
        <div className="p-4 flex items-center border-b h-full shadow-sm bg-white">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    )
}