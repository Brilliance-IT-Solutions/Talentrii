import { createContext, useState } from 'react';
import {Text} from 'react-native'

export const ToggleContext = createContext({});

export default ToggleProvider = ({children}) => {

    const [isToggled, setToggled] = useState(false)

    return (
        <ToggleContext.Provider value={{ isToggled, setToggled }}>
            {children}
        </ToggleContext.Provider >
    )
}
