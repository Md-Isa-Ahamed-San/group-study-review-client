import { ClassContext } from '../contexts';
import { useQuery,useMutation } from "@tanstack/react-query";
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
  
  const createClass = async(class_name, description, created_by)=>{
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/classes`,{
        class_name, description, created_by
      }
    );
    return data;
  }
  const useCreateClass = ()=>useMutation({
    mutationFn:({class_name, description, created_by})=>createClass(class_name, description, created_by)
  })
    return (
        <ClassContext.Provider
          value={{ useCreateClass,useFetchClasses}}
        >
          {children}
        </ClassContext.Provider>
      );
};

export default ClassProvider;