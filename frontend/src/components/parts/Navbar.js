import {Link} from "react-router-dom";

const Navbar = ({user}) => {
    return ( 
        <nav className="App-header">
            <Link to="/">
                <h1 className="title">Tiny House Design</h1>
            </Link>
            
            <ul>
                {!user &&<li><Link to="/login">Login</Link></li>}
                {!user &&<li><Link to="/register">Register</Link></li>}
                {user &&<li><Link to="/logout">Logout</Link></li>}
            </ul>
        </nav>
     );
}
 
export default Navbar;