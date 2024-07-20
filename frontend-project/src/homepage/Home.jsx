import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AllProduct} from '../Product/Allproduct/GetProduct'
import './Home.css'
import { Footer } from '../Fooder/Fooder';






export const Home = () => {
  return (
    <>
        <Carousal/>

        <AllProduct/>

        <div className='Fooder-component'>  <Footer/> </div>

       
    </>
  )
}



const Carousal = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <>
        
        <div className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img src='https://www.shutterstock.com/shutterstock/photos/2056851839/display_1500/stock-vector--d-yellow-great-discount-sale-background-illustration-of-large-sale-word-with-shopping-cart-gift-2056851839.jpg' alt='First slide' />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://cdn1.vectorstock.com/i/1000x1000/61/55/orange-cosmetics-product-ads-poster-template-vector-22536155.jpg' alt='Second slide' />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://l450v.alamy.com/450v/2bnnbpt/coffee-advertising-poster-design-template-with-illustrations-of-coffee-mug-2bnnbpt.jpg' alt='Third slide' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://png.pngtree.com/png-clipart/20220429/original/pngtree-design-of-advertising-poster-for-cosmetics-for-catalogs-and-magazines-png-image_7577286.png' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/266175955/original/2db5d468b38e966c6afa0c2a1f62d0aa12f6f950/unique-design-your-creative-product-advertisement-poster.jpg' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
         </>
    );
};

export {Carousal };

