import { ClassContext } from '../contexts';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from '../hooks/useAuth';
const ClassProvider = ({children}) => {
  const {user} = useAuth()
  const fetchClasses = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/classes/user/${user?.email}`
    );
    return data;
  };

  const useFetchClasses = ()=> useQuery({
    queryKey: ["users",user?.email],
    queryFn: fetchClasses,
  });
    
    return (
        <ClassContext.Provider
          value={{ useFetchClasses}}
        >
          {children}
        </ClassContext.Provider>
      );
};

export default ClassProvider;