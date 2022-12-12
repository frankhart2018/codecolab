import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataThunk } from "../../services/thunks";

const CurrentUser = ({ children }) => {
  const token =
    useSelector((state) => state.userDetails.token) ||
    localStorage.getItem("token");

  const { currentUser } = useSelector((state) => state.userDetails);
  console.log("token", token);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser === null && token) {
        await dispatch(userDataThunk({ token }));
      }
    };
    fetchUser();
  }, [token, dispatch, currentUser]);
  return children;
};

export default CurrentUser;
