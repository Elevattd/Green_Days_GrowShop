import React from "react";
import { useSelector } from "react-redux";
import {
  useLoginMutation,
  useLogOutMutation,
} from "../../features/auth/authApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const Logout = () => {
  const [logOut] = useLogOutMutation();
  const currentUser = useSelector(selectCurrentUser);
  const [{ isLoading }] = useLoginMutation();

  const handleClick = (e) => {
    e.preventDefault();
    logOut();
  };

  const content =
    currentUser && Object.keys(currentUser).length ? (
      <div>
        <button onClick={handleClick} disabled={isLoading}>
          Logout
        </button>
      </div>
    ) : null;

  return content;
};

export default Logout;
