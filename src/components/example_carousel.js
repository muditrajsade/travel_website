

import React from 'react';

function ExampleCarouselImage({ text }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <img
        src="https://via.placeholder.com/800x400" // Replace with your actual image URL
        alt={text}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '10px',
        }}
      >
        <h3>{text}</h3>
        <p>
          {/* You can pass additional text or customize the content */}
          Nulla vitae elit libero, a pharetra augue mollis interdum.
        </p>
      </div>
    </div>
  );
}

export default ExampleCarouselImage;
