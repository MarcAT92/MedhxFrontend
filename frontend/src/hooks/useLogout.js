import {useAuthContext} from './useauthContext'
import {useInfoContext} from './useInfoContext'

export const useLogout = () =>  {
    const {dispatch} = useAuthContext()
    const {dispatch: infoDispatch } = useInfoContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        infoDispatch({type: 'SET_INFOS', payloa: null})
    }

    return {logout}
}