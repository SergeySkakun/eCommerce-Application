import type { ReactElement, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import type { Images } from "../../../../shared";

type Properties = {
  handleOpen: () => unknown;
  productImages: Images[];
};

export function Slider(properties: Properties): ReactElement {
  const { handleOpen, productImages } = properties;
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="slider"
      >
        <button className="open-fullscreen-image" onClick={handleOpen}></button>
        {productImages.map((item): ReactNode => {
          return (
            <SwiperSlide>
              <img
                className="image-slider-dialog"
                src={item.url}
                alt={item.label}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
