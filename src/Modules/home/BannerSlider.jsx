import React from "react";
import styled from "styled-components";
import Button from "../../Components/button/Button";
import PostImage from "../post/PostComponents/PostImage";
import PostTitle from "../post/PostComponents/PostTitle";

const BannerStyles = styled.div`
  @media only screen and (max-width: 740px) {
    .slug {
      display: none;
    }
  }
`;

const BannerSlider = ({ data }) => {
  if (!data) return null;
  //time hien thi thoi gian post
  const date = data?.createdAt?.seconds
    ? new Date(data.createdAt.seconds * 1000)
    : new Date();
  const formartDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <BannerStyles>
      <div className="relative w-full h-full cursor-pointer overflow-hidden ">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.1)] rounded-lg"></div>
        <PostImage
          url={data?.image}
          to={data?.slug}
          alt=""
          className="w-full h-[520px] object-cover rounded-xl flex-shrink-0"
        />
        <div className="absolute w-full text-white left-5 bottom-5">
          <PostTitle
            size="big"
            className="mb-10 hover:text-gray-300"
            to={data?.slug}
          >
            {data?.title}
          </PostTitle>
          <div className="flex items-center mb-10 gap-x-3 slug">
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
          <Button
            to="/sign-up"
            kind="secondary"
            className="banner-button mb-20"
          >
            Get started
          </Button>
        </div>
      </div>
    </BannerStyles>
  );
};

export default BannerSlider;
