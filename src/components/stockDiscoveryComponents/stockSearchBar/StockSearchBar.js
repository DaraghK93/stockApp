import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


// Search feature fucntion which passes the user input as props
function StockSearchBar(props) {
  const [searchTerms, setSearchTerms] = useState('')

  // Whenever the user enters a keystroke, update the searchterm
  const onChangeSearch = (event) => {
    
    setSearchTerms(event.target.value)
    console.log(event.target.value)
  }

  // Returns the searchfeature component
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={onChangeSearch} type="search" placeholder="Enter search term" />
        </Form.Group>
        <Button variant="primary" type="search" onClick={onChangeSearch}>
          Search Stocks
        </Button>
      </Form>
    </div>
  );
}

export default StockSearchBar;

