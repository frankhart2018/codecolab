import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const CurrentUser = ({children}) => {
    const {currentUser} = useSelector((state) => state.userDetails)
    console.log("Checking current user", currentUser)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(profile)
    // })
    return (children)
}

export default CurrentUser