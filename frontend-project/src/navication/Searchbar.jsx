/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Offcanvas, Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Searchbar.css';

const Searchbar = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchSearchResults = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      setOpen(false);
      return;
    }
    setError('');
    try {
      const response = await axios.get('http://localhost:8000/product/search', {
        params: { term: searchTerm },
      });
      setSearchResults(response.data);
      setOpen(true);
    } catch (err) {
      setError('Failed to fetch search results. Please try again later.');
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchResults(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(searchTerm);
  };

  const handleProductClick = (id) => {
    handleClose(); // Close the Offcanvas
    navigate(`/product/${id}`); // Navigate to the product detail page
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="top">
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSearchSubmit}>
          <div className='Search-Button'>
            <FormControl
              type="search"
              placeholder="Search"
              className="Search-barinput"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type='submit' className='Button-search'>Search</button>
          </div>
        </Form>
        {error && <div className="error-message">{error}</div>}
        {open && (
          <div className='related-products'>
            {searchResults.length > 0 ? (
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li
                    key={product._id}
                    className="search-result-item"
                    onClick={() => handleProductClick(product._id)} // Add onClick handler
                  >
                    <img src={product.Image} alt={product.Name} className="search-result-image" />
                    <span className="search-result-name">{product.Name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-results">
                <img src="not.png" alt="No results found" />
              </div>
            )}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { Searchbar };



