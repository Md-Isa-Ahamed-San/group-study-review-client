import { useContext, useDebugValue } from 'react';
import { AuthContext,ClassContext } from "../contexts/index"


const useClass = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, (auth) =>
        auth?.user ? 'user logged in' : 'user logged out'
    );
    return useContext(ClassContext);
};

export default useClass;
