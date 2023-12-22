import {createContext, useReducer } from 'react'


export const InfoContext = createContext()

export const infoReducer = (state, action) => {
    switch(action.type){
        case 'SET_INFOS':
            return {
                infos: action.payload
            }
        case 'CREATE_INFO':
            return {
                infos: [action.payload, ...state.infos]
            }
        case 'DELETE_INFO':
            return {
                infos: state.infos.filter((w) => w._id !== action.payload._id)
            }

        default:
            return state
    }
}

export const InfoContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(infoReducer, {
        infos: null
    })
    
    return (
        <InfoContext.Provider value={{...state, dispatch}}> 
            { children }
        </InfoContext.Provider>
    )
}
