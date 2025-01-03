import { useContext, useDebugValue } from 'react';
import { AuthContext } from "../contexts/index"

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, (auth) =>
        auth?.user ? 'user logged in' : 'user logged out'
    );
    return useContext(AuthContext);
};

export default useAuth;
