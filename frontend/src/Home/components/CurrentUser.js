import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataThunk } from "../../services/thunks";

const CurrentUser = ({ children }) => {
    console.log("children", children)
    const { token } = useSelector((state) => state.userDetails)
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("token", token)
    console.log("currentUser", currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        if (currentUser === null) {
            const res = dispatch(userDataThunk({ token }));
        }
    }, [token])
    return (children)
}

export default CurrentUser