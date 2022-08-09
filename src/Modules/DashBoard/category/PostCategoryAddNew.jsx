import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Components/button/Button";
import Field from "../../../Components/field/Field";
import FieldCheckboxes from "../../../Components/field/FieldCheckboxes";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import slugify from "slugify";
import { db } from "../../../Firebase/Firebase";
import { categoryStatus } from "../../../Utils/constans";
import DashboardHeading from "../DashboardHeading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PostCategoryAddNew = () => {
  const navigate = useNavigate();
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  // const [addCategories, setAddCategories] = React.useState([]);
  const handleAddCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    console.log(newValues);
    //dieu kien slug neu ko nhap thi se lay values cua title
    newValues.slug = slugify(values.slug || values.title, { lower: true });
    //statsu values phai dc convert sang number truoc khi submit
    newValues.status = Number(values.status);
    //luu du lieu vao firebase
    const colRef = collection(db, "categories");
    //get du lieu nhap vao tu input up len firebase
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create new category successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/manage/category");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "error!",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
    // setAddCategories([...addCategories, newValues]);
  };

  const watchStatus = watch("status"); //trạng thái của radio
  return (
    <Fragment>
      <DashboardHeading title="New Category" desc="Add new Categories" />
      <form onSubmit={handleSubmit(handleAddCategory)} autoComplete="off">
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              placeholder="Enter your Name"
              name="name"
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
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </Fragment>
  );
};

export default PostCategoryAddNew;
