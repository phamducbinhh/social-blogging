import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../../../Components/button/Button";
import Field from "../../../Components/field/Field";
import ImageUpload from "../../../Components/image/ImageUpload";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import DashboardHeading from "../DashboardHeading";
import Swal from "sweetalert2";
import { db } from "../../../Firebase/Firebase";
import { useFirebaseImage } from "../../../Hooks/useFirebaseImage";

const UserProfile = () => {
  //lay id cua profile can update
  const [params] = useSearchParams();
  const userAdmin = params.get("id");
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  //get profile can update tu firebase users
  useEffect(() => {
    const getUser = async () => {
      if (!userAdmin) return;
      const colRef = doc(db, "users", userAdmin);
      const docSnap = await getDoc(colRef);
      if (docSnap) {
        reset(docSnap.data()); //reset ve trang thai ban dau khi click vao update
        setImage(docSnap.data()?.avatar || "");
      }
    };
    getUser();
  }, [userAdmin]);

  //ham update profile
  const handleUploadProfile = async (values) => {
    if (!isValid) return;
    //bắt lỗi try catch
    try {
      const colRef = doc(db, "users", userAdmin);
      await updateDoc(colRef, {
        username: values.username,
        email: values.email,
        avatar: image,
        pasword: values.password,
        phone: Number(values.phone),
        address: values.address,
        birthday: values.birthday,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Update Faild",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  //regex de toi uu xoa anh
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  //hooks upload image
  //gọi hàm custom hook để upload ảnh
  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues, imageName);
  return (
    <Fragment>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      />
      <form autoComplete="off" onSubmit={handleSubmit(handleUploadProfile)}>
        <div className="text-center mb-10">
          <ImageUpload
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout mb-5">
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
        </div>
        <div className="form-layout mb-5">
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
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
            <Label>New Address</Label>
            <Input
              control={control}
              name="address"
              type="text"
              placeholder="Enter your Address"
            ></Input>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </Fragment>
  );
};

export default UserProfile;
