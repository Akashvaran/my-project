import './Service.css';

const Service = () => {
  return (
    <>
    <div className="our-services">
      <h2>Our Services</h2>
      <div className="main-image">
        <img src="https://jolt-digital.com/wp-content/uploads/elementor/thumbs/TPG-case-study_image-scaled-q5p059cqiaw3dgjy8yps38vvsnlk29vwsgkflwwxss.jpg" alt="Service" />
      </div>
      <div className="services-list">
        <div className="service-card">
          <div className="icon-container">
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQKfTpM912_54iAmXoUnv_pJd7iTYiWnhh6otf9Yp9l-bexeyYR" alt="Mobile Development" />
          </div>
          <div className='contant-cart'>
          <h3>Mobile Development</h3>
          <p>Sample text. Click to select the text box. Click again or double click to start editing the text. Excepteur sint occaecat cupidatat non proident.</p>
          <button>More</button>
          </div>
        </div>
        <div className="service-card">
          <div className="icon-container">
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTCmbmgr6EvpebmYy-WY4YgVR7Y3Yeq6v4HiQLLwnQeqwN1n01S" alt="Mobility Services" />
          </div>
          <div className='contant-cart'>
          <h3>Mobility Services</h3>
          <p>Sample text. Click to select the text box. Click again or double click to start editing the text. Excepteur sint occaecat cupidatat non proident.</p>
          <button>More</button>
          </div>
        </div>
        <div className="service-card">
          <div className="icon-container">
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSQZztMr7pxXUXRonxNN1OnO1ZWmjG784h5LHroTZNPHGhD6lMX" alt="Software Consulting" />
          </div>
          <div className='contant-cart'>
          <h3>Software Development</h3>
          <p>Sample text. Click to select the text box. Click again or double click to start editing the text. Excepteur sint occaecat cupidatat non proident.</p>
          <button>More</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export {Service};




