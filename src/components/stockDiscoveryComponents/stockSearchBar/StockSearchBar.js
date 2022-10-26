import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom"

// Search feature fucntion which passes the user input as props
function StockSearchBar() {
  const [keyword, setKeyword] = useState('')
  // const category = 'search'
  const navigate = useNavigate()


  // Whenever the user enters a keystroke, update the searchterm
  // const onChangeSearch = (event) => {
  //   setkeyword(event.target.value)
  // }
  // const onSubmitSearch = (event) => {
  //   event.preventDefault();
    
  //   if ( keyword === '') {
  //     navigate(`/stockdiscovery/`)

  //   } else {
     
  //    navigate(`/stockdiscovery/search/${keyword}`)
  //   }
  // }
  const onSubmitSearch = (event) => {
    event.preventDefault();
    
    if ( keyword === '') {
      navigate(`/stockdiscovery/`)

    } else {
     
     navigate(`/stockdiscovery/search/${keyword}`)
    }
  }


  // Returns the searchfeature component
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={(event) => setKeyword(event.target.value)}
                         type="text" placeholder="Enter search term" />
        </Form.Group>
        <Button variant="primary" type="search" onClick={onSubmitSearch}>
          Search Stocks
        </Button>
      </Form>
    </div>
  );
}

export default StockSearchBar;

