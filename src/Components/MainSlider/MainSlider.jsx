import React from 'react'
import style from './MainSlider.module.css'
import Slider from 'react-slick'
import sliderimg1 from '../../Assets/Images/slider-image-1.jpeg'
import sliderimg2 from '../../Assets/Images/slider-image-2.jpeg'
import sliderimg3 from '../../Assets/Images/slider-image-3.jpeg'
import blog1 from '../../Assets/Images/blog-img-1.jpeg'
import blog2 from '../../Assets/Images/blog-img-2.jpeg'
 
export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return <>
  <div className="row gx-0">
    <div className="col-md-8">
    <Slider {...settings}>
      <div>
        <img src={sliderimg1} className='w-100'/>
      </div>
      <div>
        <img src={sliderimg2} className='w-100'/>
      </div>
      <div>
        <img src={sliderimg3} className='w-100'/>
      </div>
    </Slider>
    </div>
    <div className="col-md-4">
      <div className="row">
        <div className="col-md-12">
          <img src={blog1} className='w-100' height={240}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <img src={blog2} className='w-100' height={240}/>
        </div>
      </div>
    </div>
  </div>
  </>
}
