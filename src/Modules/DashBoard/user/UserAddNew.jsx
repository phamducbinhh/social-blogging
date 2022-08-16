import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Components/button/Button";
import Field from "../../../Components/field/Field";
import FieldCheckboxes from "../../../Components/field/FieldCheckboxes";
import ImageUpload from "../../../Components/image/ImageUpload";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import { auth, db } from "../../../Firebase/Firebase";
import { useFirebaseImage } from "../../../Hooks/useFirebaseImage";
import { role, userStatus } from "../../../Utils/constans";
import DashboardHeading from "../DashboardHeading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

const UserAddNew = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const {
    control,
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      email: "",
      status: userStatus.HANDING,
      role: role.ADMIN,
      createAt: new Date(),
    },
  });

  //ham create account user
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    // phần quyền phải là admin mới được quyền create
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission Create User",
        "warning"
      );
      return;
    }
    //tao account  user email va password authenticaiton firebase
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const colRef = collection(db, "users");
      await addDoc(colRef, {
        username: values.username,
        password: values.password,
        email: values.email,
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Create new User with email : ${values.email} successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Create new User with email : ${values.email} failed!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      reset({
        username: "",
        password: "",
        avatar: "",
        email: "",
        status: userStatus.HANDING,
        role: role.ADMIN,
        createAt: new Date(),
      });
    }
    navigate("/manage/user");
  };

  //tao trang thai cua radio
  const watchStatus = watch("status");
  const watchRole = watch("role");

  //hooks upload image
  //gọi hàm custom hook để upload ảnh
  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);
  return (
    <div>
      <DashboardHeading title="New user" desc="Add new user to system" />
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="form-layout">
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Upload Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === role.ADMIN}
                value={role.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === role.MODE}
                value={role.MODE}
              >
                Mode
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === role.USER}
                value={role.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.HANDING}
                value={userStatus.HANDING}
              >
                Handing
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BLOCKED}
                value={userStatus.BLOCKED}
              >
                Blocked
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
