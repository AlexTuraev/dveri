import React from 'react';

import './img-slider.scss';

const ImgSlider = () =>{
    return(
        <section className='container-big img-slider'>
            <div className='img-slider__l-block'>
                <div className='img-slider__cover'></div>
                
                <div className='img-slider__group-btn'>
                    <button className='ui-btn img-slider__btn'> Назад </button>
                    <button className='ui-btn img-slider__btn'> Вперед </button>
                </div>
            </div>
        </section>
    );
}

export default ImgSlider;