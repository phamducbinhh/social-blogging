import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import Swal from "sweetalert2";

export const useFirebaseImage = (setValue, getValues) => {
  //hàm upload image
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!setValue || !getValues) return;
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressCercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressCercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Upload is not running");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  // hàm chọn ảnh (select image)
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  // xóa ảnh đã chọn từ trong firebase
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete Success!",
          showConfirmButton: false,
          timer: 1500,
        });
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    image,
    setImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
  };
};
