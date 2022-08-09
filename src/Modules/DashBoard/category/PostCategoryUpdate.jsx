import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import slugify from "slugify";
import Button from "../../../Components/button/Button";
import Field from "../../../Components/field/Field";
import FieldCheckboxes from "../../../Components/field/FieldCheckboxes";
import Input from "../../../Components/input/Input";
import Label from "../../../Components/label/Label";
import Radio from "../../../Components/radio/Radio";
import { db } from "../../../Firebase/Firebase";
import { categoryStatus } from "../../../Utils/constans";
import DashboardHeading from "../DashboardHeading";

const PostCategoryUpdate = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");

  //get data from firebase
  useEffect(() => {
    async function FetchData() {
      const colRef = doc(db, "categories", categoryId);
      const docSnap = await getDoc(colRef);
      reset(docSnap.data()); //reset ve trang thai ban dau khi click vao edit
    }
    FetchData();
  }, [categoryId]);

  //ham update data
  const handleUpdate = async (values) => {
    if (!isValid) return;
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Update success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/manage/category");
  };
  const watchStatus = watch("status"); //trang thai cua radio
  if (!categoryId) return null;

  return (
    <Fragment>
      <DashboardHeading
        title="Update Category"
        desc={`Update Category Description:id ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdate)}>
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
          Update Category
        </Button>
      </form>
    </Fragment>
  );
};

export default PostCategoryUpdate;
