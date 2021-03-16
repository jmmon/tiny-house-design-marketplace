import {Link} from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="App-header">
            <Link to="/">
                <h1 className="title">Tiny House Design</h1>
            </Link>
            
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
     );
}
 
export default Navbar;