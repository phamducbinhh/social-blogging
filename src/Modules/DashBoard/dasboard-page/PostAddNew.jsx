import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../Components/button/Button";
import { Dropdown } from "../../../Components/dropdown";
import Field from "../../../Components/field/Field";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import slugify from "slugify";
import { postStatus, role } from "../../../Utils/constans";
import ImageUpload from "../../../Components/image/ImageUpload";
import { useFirebaseImage } from "../../../Hooks/useFirebaseImage";
import Toggle from "../../../Components/toggle/Toggle";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase/Firebase";
import Swal from "sweetalert2";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../../../Context/AuthContext";
import DashboardHeading from "../DashboardHeading";
const PostAddNewStyles = styled.div`
  @media only screen and (max-width: 740px) {
    .mobile-slug {
      display: flex;
      flex-direction: column;
    }
  }
`;

const PostAddNew = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      image: "",
      slug: "",
      status: 2,
      hot: false,
      likes: 0,
      peopleLike: [],
      category: {},
      user: {},
    },
  });

  const { userInfo } = useAuth();
  //gọi hàm custom hook để upload ảnh
  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);

  //dung useEffect de lay dc id cua user dang dang nhap hien tai day du cac thong tin cua user
  useEffect(() => {
    async function getUserId() {
      if (!userInfo) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    getUserId();
  }, [userInfo.email]);
  //hàm thêm bài viết mới
  const handleAddPost = async (values) => {
    if (!isValid) return; //neu form khong hop le thi khong thuc hien
    // phần quyền phải là admin mới được quyền create post
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission Create User",
        "warning"
      );
      return;
    }
    const valuesCopy = { ...values };
    //dieu kien slug neu ko nhap thi se lay values cua title
    valuesCopy.slug = slugify(values.slug || values.title, { lower: true });
    //statsu values phai dc convert sang number truoc khi submit
    valuesCopy.status = Number(values.status);
    //luu du lieu vao firebase
    const colRef = collection(db, "posts");
    try {
      await addDoc(colRef, {
        ...valuesCopy,
        categoryId: valuesCopy.category.id,
        userId: valuesCopy.user.id,
        image,
        createAt: serverTimestamp(),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create new Post successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      reset({
        title: "",
        image: "",
        slug: "",
        status: 2,
        hot: false,
        createAt: serverTimestamp(),
        category: {},
        user: {},
      });
    }
    setSelectCategory({});
  };

  //xử lý lấy dữ liệu từ firebase để render ra dropdown
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1)); // lấy các category có status = 1 tương ứng với approved
      const querySnapshot = await getDocs(q);
      let result = [];
      //push data vào mảng rỗng
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  //ham xu ly click vao dropdown list
  const handleClickDropdown = async (item) => {
    //gop chung cac truong id va name cua category
    const colRef = doc(db, `categories/${item.id}`);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };

  const watchStatus = watch("status"); //trạng thái của radio
  const watchHot = watch("hot"); //trạng thái của toggle
  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add New Post" desc="Add new Dashboard" />
      <form onSubmit={handleSubmit(handleAddPost)} autoComplete="off">
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
              required
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10 ">
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
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory?.name || "Select Dropdown"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickDropdown(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10 mobile-slug">
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            />
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
