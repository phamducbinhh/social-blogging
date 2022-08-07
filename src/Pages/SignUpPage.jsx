import React, { useEffect } from "react";
import Label from "../Components/label/Label";
import Field from "../Components/field/Field";
import Input from "../Components/input/Input";
import { useForm } from "react-hook-form";
import AuthenticationPage from "./AuthenticationPage";
import Button from "../Components/button/Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import TogglePassword from "../Components/toggle/TogglePassword";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";

//validate vs yup
const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const { toggle } = useAuth();

  //react hook form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // xử lý form đăng ký tài khoản
  const handleSignUpForm = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.username,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.username,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully!!!");
    navigate("/");
  };

  //hiện lỗi khi validate bằng toast
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  //dặt tiêu đề cho page
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignUpForm)}
      >
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            type="text"
            placeholder="Enter your Username"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="text"
            placeholder="Enter your Email"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type={toggle ? "text" : "password"}
            placeholder="Enter your Password"
            control={control}
          >
            <TogglePassword />
          </Input>
        </Field>
        <div className="mb-4 text-gray-800 font-semibold">
          You already have an account?{" "}
          <NavLink to={"/sign-in"} className="text-primary font-bold">
            Login
          </NavLink>{" "}
        </div>
        <Button
          type="submit"
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
