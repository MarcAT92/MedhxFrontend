import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const {signup, isLoading, error} = useSignup('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        await signup(email, fname, lname, password, cpassword)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>First Name:</label>
            <input 
            type="firstname"
            onChange={(e) => setFname(e.target.value)}
            value={fname}
            />
            <label>Last Name:</label>
            <input 
            type="lastname"
            onChange={(e) => setLname(e.target.value)}
            value={lname}
            />
            <label>Password:</label>
            <input 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <label>Confirm Password:</label>
            <input 
            type="password"
            onChange={(e) => setCPassword(e.target.value)}
            value={cpassword}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup