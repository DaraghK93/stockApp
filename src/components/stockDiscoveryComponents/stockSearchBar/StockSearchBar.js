import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom"

// Search feature fucntion which passes the user input as props
function StockSearchBar(props) {
  const [searchTerms, setSearchTerms] = useState('')
  const navigate = useNavigate()

  // Whenever the user enters a keystroke, update the searchterm
  const onChangeSearch = (event) => {
    setSearchTerms(event.target.value)
  }

  const onSubmitSearch = (event) => {
    if (typeof event.target.value == 'undefined') {
      setSearchTerms("all")
      navigate(`/search/stockdiscovery/usersearch/all`)

    } else {
      setSearchTerms(event.target.value)
      navigate(`/search/stockdiscovery/usersearch/${searchTerms}`)
    }
  }

  // Returns the searchfeature component
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={onChangeSearch} type="search" placeholder="Enter search term" />
        </Form.Group>
        <Button variant="primary" type="search" onClick={onSubmitSearch}>
          Search Stocks
        </Button>
      </Form>
    </div>
  );
}

export default StockSearchBar;

