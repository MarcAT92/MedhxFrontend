import {  useInfoContext } from '../hooks/useInfoContext'
import { useAuthContext } from '../hooks/useauthContext'

// date fns
import  formatDistanceToNow from 'date-fns/formatDistanceToNow'


const InfoDetails = ({ info }) => {
    const { dispatch } = useInfoContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:4000/api/info/` + info._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_INFO', payload: json})
        }
    }

    return (
        <div className="info-details">
            <h4>{info.title}</h4>
            <p><strong>Blood Pessure:</strong>{info.bloodpressure}</p>
            <p><strong>Heart Rate:</strong>{info.heartrate}</p>
            <p><strong>Blood Sugar:</strong>{info.bloodsugar}</p>
            <p><strong>Created At:</strong> {new Date(info.createdAt).toLocaleDateString()}</p>
            <p>{formatDistanceToNow(new Date(info.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default InfoDetails