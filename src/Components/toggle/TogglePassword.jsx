import React from "react";
import { useAuth } from "../../Context/AuthContext";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";

const TogglePassword = () => {
  const { toggle, setToggle } = useAuth();
  return (
    <>
      {!toggle ? (
        <IconEyeClose onClick={() => setToggle(true)}></IconEyeClose>
      ) : (
        <IconEyeOpen onClick={() => setToggle(false)}></IconEyeOpen>
      )}
    </>
  );
};

export default TogglePassword;
