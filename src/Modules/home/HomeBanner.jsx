import React from "react";
import styled from "styled-components";
import { useAuth } from "../../Context/AuthContext";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import BannerSlider from "./BannerSlider";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  margin-bottom: 60px;
`;

const HomeBanner = () => {
  const { postList } = useAuth();
  return (
    <HomeBannerStyles>
      <div className="container">
        <Swiper
          grabCursor={true}
          slidesPerView="auto"
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          {postList.length > 0 &&
            postList.map((post) => (
              <SwiperSlide key={post?.id}>
                <BannerSlider data={post} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
