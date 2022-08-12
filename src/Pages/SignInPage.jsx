import React, { useEffect } from "react";
import Label from "../Components/label/Label";
import Field from "../Components/field/Field";
import Input from "../Components/input/Input";
import { useForm } from "react-hook-form";
import AuthenticationPage from "./AuthenticationPage";
import Button from "../Components/button/Button";
import { useAuth } from "../Context/AuthContext";
import TogglePassword from "../Components/toggle/TogglePassword";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import Swal from "sweetalert2";

//validate vs yup
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { userInfo, toggle } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //thông báo lỗi validate
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  //hàm đăng nhập
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login success!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate("/");
  };

  //hàm tiêu đề
  useEffect(() => {
    document.title = "Login Page";
    //điều kiện nếu đã đăng nhập thì chuyển hướng về trang chủ
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
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
          You had have an account?{" "}
          <NavLink to={"/sign-up"} className="text-primary font-bold">
            Sign Up
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

export default SignInPage;
