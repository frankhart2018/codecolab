import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const ProtectedRoute = ({children}) => {
    const token = useSelector((state) => state.userDetails.token) || localStorage.getItem('token');
    const {currentUser} = useSelector((state) => state.userDetails)
    if (currentUser || token) {
        return (children)
    } else {
        return (<Navigate to={'/login'}/>)
    }
}
export default ProtectedRoute