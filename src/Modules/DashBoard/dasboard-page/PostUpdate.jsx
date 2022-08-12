import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Button from "../../../Components/button/Button";
import { Dropdown } from "../../../Components/dropdown";
import Field from "../../../Components/field/Field";
import ImageUpload from "../../../Components/image/ImageUpload";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import Toggle from "../../../Components/toggle/Toggle";
import { db } from "../../../Firebase/Firebase";
import { useFirebaseImage } from "../../../Hooks/useFirebaseImage";
import { postStatus, role } from "../../../Utils/constans";
import DashboardHeading from "../DashboardHeading";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import { useAuth } from "../../../Context/AuthContext";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);
const PostUpdate = () => {
  const [params] = useSearchParams();
  //xử lý lấy dữ liệu từ firebase để render ra dropdown
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  //react quill state
  const [content, setContent] = useState("");
  const postID = params.get("id");
  const { userInfo } = useAuth();

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
    defaultValues: {},
  });

  //get data post from firebase
  useEffect(() => {
    const getPostData = async () => {
      if (!postID) return;
      const colRef = doc(db, "posts", postID);
      const docSnap = await getDoc(colRef);
      if (docSnap) {
        reset(docSnap.data()); //reset ve trang thai ban dau khi click vao update
        setSelectCategory(docSnap.data()?.category || "");
        setContent(docSnap.data()?.content || "");
        // setImage(docSnap.data()?.image || "");
      }
    };
    getPostData();
  }, [postID, reset]);

  //ham update post
  const handleUpdatePost = async (values) => {
    //phải là admin mới được quyền update
    if (userInfo?.role !== role.ADMIN) {
      Swal.fire(
        "Failed",
        "You must be an admin to have permission Update Post",
        "warning"
      );
      return;
    }
    if (!isValid) return;
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      ...values,
      image,
      content,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update Post successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const watchStatus = watch("status"); //trạng thái của radio
  const watchHot = watch("hot"); //trạng thái của toggle

  //hooks upload image
  //gọi hàm custom hook để upload ảnh
  const { image, progress, handleSelectImage, handleDeleteImage, setImage } =
    useFirebaseImage(setValue, getValues);

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

  //react quill image upload library
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
    ],
  };

  if (!postID)
    return (
      <div className="text-3xl font-semibold text-red-500">
        You Need Choosen Post Update !
      </div>
    );
  return (
    <Fragment>
      <DashboardHeading
        title="Update Post"
        desc={`Update Post Content with ID: ${postID}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
        <div className="grid grid-cols-2 gap-x-10 mb-10">
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
        <div className="mb-10">
          <Field>
            <Label>Content is here</Label>
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
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
          Update Post
        </Button>
      </form>
    </Fragment>
  );
};

export default PostUpdate;
