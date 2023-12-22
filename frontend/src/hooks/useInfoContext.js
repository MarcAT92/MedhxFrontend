import { InfoContext } from "../context/infoContext";
import { useContext } from "react";

export const useInfoContext = () => {
    const context = useContext(InfoContext)

    if (!context) {
        throw Error('useInfoContext must be use inside of a infoContextProvider')
    }

    return context
}

