import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useauthContext'
import logo from '../assets/images/logo.png'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
            <Link to="/">
                <img src={logo} alt=""/>
            </Link>
            <nav>
                {user && (
                <div>
                    <span>Welcome {user.fname}{user.username}</span>
                    <button onClick={handleClick}>Log out</button>
                </div> 
                )}
                {!user && (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
                )}
            </nav>
            </div>
        </header>
    )
}

export default Navbar