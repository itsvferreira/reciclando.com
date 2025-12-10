import './ImageCarousel.css';

export function ImageCarousel({ images, id }) {
  return (
    <div
      id={`imageCarousel${id}`}
      className='carousel slide'
    >
      <div className='carousel-inner'>
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img
              src={img}
              className='d-block w-100'
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target={`#imageCarousel${id}`}
            data-bs-slide='prev'
          >
            <span className='carousel-control-prev-icon' />
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target={`#imageCarousel${id}`}
            data-bs-slide='next'
          >
            <span className='carousel-control-next-icon' />
          </button>
        </>
      )}
    </div>
  );
}
