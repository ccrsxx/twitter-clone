import React from 'react';
import imageStyles from '../styles/images.module.css'; // Adjust path if necessary

const SliderComponent = ({ numColumns, setNumColumns }) => {
    return (
        <div className={imageStyles.sliderContainer}>
            <input 
                id="column-slider"
                type="range" 
                min="2" 
                max="15" 
                value={numColumns} 
                onChange={(e) => setNumColumns(e.target.value)}
            />
        </div>
    );
};

export default SliderComponent;
