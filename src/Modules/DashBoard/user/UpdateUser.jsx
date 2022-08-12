import Swal from "sweetalert2";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../Components/button/Button";
import Field from "../../../Components/field/Field";
import FieldCheckboxes from "../../../Components/field/FieldCheckboxes";
import ImageUpload from "../../../Components/image/ImageUpload";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import Textarea from "../../../Components/text-area/Textarea";
import { db } from "../../../Firebase/Firebase";
import { role, userStatus } from "../../../Utils/constans";
import DashboardHeading from "../DashboardHeading";
import { useFirebaseImage } from "../../../Hooks/useFirebaseImage";
import { useAuth } from "../../../Context/AuthContext";

const UpdateUser = () => {
  const navigate = useNavigate();
  //lay id cua user can update
  const [params] = useSearchParams();
  const userAccountID = params.get("id");
  const { userInfo } = useAuth();

  // react-hook-form
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  //trang thai radio va role
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageUrl = getValues("avatar");
  console.log(imageUrl);

  //get user can update tu firebase users
  useEffect(() => {
    const getUser = async () => {
      const colRef = doc(db, "users", userAccountID);
      const docSnap = await getDoc(colRef);
      if (docSnap) {
        reset(docSnap.data()); //reset ve trang thai ban dau khi click vao update
        // setImage(docSnap.data()?.avatar || "");
      }
    };
    getUser();
  }, [userAccountID]);

  //ham update user
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    // phần quyền phải là admin mới được quyền update
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission Update User",
        "warning"
      );
      return;
    }

    //bắt lỗi try catch
    try {
      const colRef = doc(db, "users", userAccountID);
      await updateDoc(colRef, {
        username: values.username,
        email: values.email,
        avatar: image,
        pasword: values.password,
        description: values.description,
        role: Number(values.role),
        status: Number(values.status),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/manage/user");
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

  //hooks upload image
  //gọi hàm custom hook để upload ảnh
  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues);

  //nếu không phải userId của user đang đăng nhập thì không được update
  if (!userAccountID)
    return (
      <div className="text-3xl font-semibold text-red-500">
        You Need Choosen User Update !
      </div>
    );

  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc={`Update user information ${userAccountID}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
              required
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
              required
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
              required
            ></Input>
          </Field>
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
        </div>
        <div className="form-layout">
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
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
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
    </div>
  );
};

export default UpdateUser;
