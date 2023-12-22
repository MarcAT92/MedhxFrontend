import { useEffect } from "react"
import {  useInfoContext } from '../hooks/useInfoContext'
import { useAuthContext } from '../hooks/useauthContext'

// components
import InfoDetails from '../components/infoDetails'
import InfoForm from '../components/infoForm'


const Home = () => {
  const {infos, dispatch} =  useInfoContext()
  const {user} = useAuthContext()

    useEffect(() => {
        const fetchInfo = async () => {
             const response = await fetch(`http://localhost:4000/api/info`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
             })
             const json = await response.json()

             if (response.ok) {
                dispatch({type: 'SET_INFOS', payload: json})
             }
        }
        
        if(user){
          fetchInfo()
        } 
    }, [dispatch, user]);
    
    return (
        <div className="home">
           <InfoForm />
           <div className="infos">
                {infos && infos.map((info) => (
                  <InfoDetails key={info._id} info={info} />
                ))}
            </div>
               
        </div>
    )
}


export default Home