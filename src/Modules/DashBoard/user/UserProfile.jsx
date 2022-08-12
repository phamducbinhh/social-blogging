import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Components/button/Button";
import Field from "../../../Components/field/Field";
import ImageUpload from "../../../Components/image/ImageUpload";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import DashboardHeading from "../DashboardHeading";

const UserProfile = () => {
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <Fragment>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      />
      <form autoComplete="off">
        <div className="text-center mb-10">
          <ImageUpload className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"></ImageUpload>
        </div>
        <div className="form-layout mb-5">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout mb-5">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout mb-5">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout mb-5">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]">
          Update
        </Button>
      </form>
    </Fragment>
  );
};

export default UserProfile;
