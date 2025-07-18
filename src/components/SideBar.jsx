import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar(){
    return(
        <>

        <div className="dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-logo">Admin</h2>
        <h2 className="sidebar-logo"><a href="/">BackHome</a></h2>
        <nav className="sidebar-nav">

            <Link to="/dashboard/users">Users</Link>
            <Link to="/dashboard/users/create">CreateUser</Link>
            <Link to="/dashboard/products">Products</Link>
            <Link to="/dashboard/products/create">CreateProduct</Link>
            <Link to="/dashboard/orders">Orders</Link>
            <Link to="/dashboard/orders/accepted">Accepted</Link>
            <Link to="/dashboard/orders/refused">Refused</Link>


        </nav>
      </aside>


    </div>

        </>
    )
}