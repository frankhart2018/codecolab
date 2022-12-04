import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataThunk } from "../../services/thunks";

const CurrentUser = ({ children }) => {
    const { token } = useSelector((state) => state.userDetails)
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("Checking current user", token)
    const dispatch = useDispatch()
    useEffect(async () => {
        if (currentUser === null) {
            const res = await dispatch(userDataThunk({ token }));
        }
    }, [token])
    return (children)
}

export default CurrentUser