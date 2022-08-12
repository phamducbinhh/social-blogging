import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/button/Button";

const BannerSlider = ({ data }) => {
  if (!data) return null;
  //time hien thi thoi gian post
  const date = data?.createdAt?.seconds
    ? new Date(data.createdAt.seconds * 1000)
    : new Date();
  const formartDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="relative w-full h-full cursor-pointer overflow-hidden ">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.1)] rounded-lg"></div>
      <img
        src={data?.image}
        alt=""
        className="w-full h-[520px] object-cover rounded-xl flex-shrink-0"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <Link to={data?.slug}>
          <h2 className="mb-10 text-3xl font-bold">{data?.title}</h2>
        </Link>
        <div className="flex items-center mb-10 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-lg">
            {data?.category?.name}
          </span>
          <span className="px-4 py-2 border border-white rounded-lg">
            {data?.user?.username}
          </span>
          <span className="px-4 py-2 border border-white rounded-lg">
            {formartDate}
          </span>
        </div>
        <Button to="/sign-up" kind="secondary" className="banner-button mb-20">
          Get started
        </Button>
      </div>
    </div>
  );
};

export default BannerSlider;
