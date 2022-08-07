import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../../Components/button/Button";
import { Dropdown } from "../../../Components/dropdown";
import Field from "../../../Components/field/Field";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import slugify from "slugify";
import { postStatus } from "../../../Utils/constans";
import ImageUpload from "../../../Components/image/ImageUpload";
import { useFirebaseImage } from "../../../Hooks/useFirebaseImage";
import Toggle from "../../../Components/toggle/Toggle";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase/Firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      categoryId: "",
    },
  });

  //hàm thêm bài viết mới
  const handleAddPost = (values) => {
    const valuesCopy = { ...values };
    //dieu kien slug neu ko nhap thi se lay values cua title
    valuesCopy.slug = slugify(values.slug || values.title);
    //statsu values phai dc convert sang number truoc khi submit
    valuesCopy.status = Number(values.status);
    console.log("PostAddNew ~ addPostHandler", valuesCopy);
  };

  //gọi hàm custom hook để upload ảnh
  const { image, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);

  //xử lý lấy dữ liệu từ firebase để render ra dropdown
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
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

  const watchStatus = watch("status"); //trạng thái của radio
  const watchHot = watch("hot"); //trạng thái của toggle
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading capitalize">Add new post</h1>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
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
              <Dropdown.Select placeholder="Select Category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => setValue("categoryId", item.id)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
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
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
