import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom"
import FormContainer from '../../layout/FormContainer/FormContainer';

// Search feature fucntion which passes the user input as props
function StockSearchBar() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()){
      navigate(`/search/stock/${keyword}`)
    }else{
      navigate(`/stockdiscovery/`)
    }
  }


    return(
      <FormContainer>
         <Form
        onSubmit={submitHandler}
      >
        <Form.Control
          type='text'
          name='search'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Stocks'
        >
          
        </Form.Control>
        <Button type='submit'>
          Search
        </Button>
        
      </Form>
      </FormContainer>
     
    )
}

export default StockSearchBar;

