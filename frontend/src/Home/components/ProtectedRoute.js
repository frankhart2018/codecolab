import {useSelector} from "react-redux";
import {Navigate} from "react-router";

const ProtectedRoute = ({children}) => {
    const { currentUser } = useSelector((state) => state.userDetails)

    if (currentUser) {
        return (children)
    } else {
        return (<Navigate to={'/login'}/>)
    }
}
export default ProtectedRoute