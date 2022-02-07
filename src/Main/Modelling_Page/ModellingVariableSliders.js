import React from 'react';
import './ModellingVariableSliders.css';
import Slider from '@mui/material/Slider';

function ModellingVariableSliders({flexCoefficients, handleSliderChange}) {



    return (
        <div className='modelling__variable__sliders__outer'>
            <p>Use the sliders to flex the variables.</p>
            {flexCoefficients.map((item, index) => (
                <div className='modelling__variable__slider__zone' key={index}>
                    {item.label}
                    <Slider size="small" id={item.label} onChangeCommitted={(event, newValue) => handleSliderChange(event, newValue)} defaultValue={0} name={item.label} min={-100} max={300} aria-label="Small" valueLabelFormat={x => x + '%'} valueLabelDisplay="auto"/>
                </div>
            ))}
        </div>
    )
}

export default ModellingVariableSliders
