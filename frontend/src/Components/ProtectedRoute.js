import {Route,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({children}) => {
  
    const isAuthenticated = useSelector((state) => state.authenticator.isAuthenticated);
    console.log({isAuthenticatedPR : isAuthenticated});
    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    return children;
}
export default ProtectedRoute