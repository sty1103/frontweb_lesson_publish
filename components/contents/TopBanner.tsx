import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './TopBanner.module.scss';
import Image from "next/legacy/image";

export default function TopBanner() {
  const data = [
    '/images/promotion_slide1.jpeg',
    '/images/promotion_slide2.jpeg',
    '/images/promotion_slide3.jpeg'
  ];
  const [ clientXMouseDown, setClientXMouseDown ] = useState<number>(0);
  const [ clientYMouseDown, setClientYMouseDown ] = useState<number>(0);

  const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    variableWidth: true
  };

  return (
    <section className={styles.root}>
      <Slider {...sliderSettings} className={styles.banner}>
        {data.map((v, k) => {
          return (
            <div
              className={styles['banner-item']} 
              onClick={e => clickBanner(e)} 
              onMouseDown={e => handleOnMouseDown(e)}
              key={k}
            >
              <Image
                src={v}
                alt=''
                layout='fill'
                objectFit='cover'
              />
            </div>
          )
        })}
      </Slider>
    </section>
  )

  function handleOnMouseDown(e: React.MouseEvent) {
    setClientXMouseDown(e.clientX);
    setClientYMouseDown(e.clientY);
  }

  function clickBanner(e: React.MouseEvent) {
    // 슬라이드를 드래그 중엔 클릭 이벤트 차단
    if (clientXMouseDown !== e.clientX && 
      clientXMouseDown !== e.clientY) {
      e.preventDefault()
    } else {
      console.log('clicked banner...');
    }
  }
}