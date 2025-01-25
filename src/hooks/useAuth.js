import { useContext, useDebugValue } from 'react';
import { AuthContext } from "../contexts/index"

const useAuth = () => {
    // const { user } = useContext(AuthContext);
    // useDebugValue(user, (user) =>
    //     user ? 'user logged in' : 'user logged out'
    // );
    return useContext(AuthContext);
};

export default useAuth;
