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
      navigate(`/game/`)
    }
    // reset form to blank after search
    e.target.reset()
    setKeyword("")
  }


    return(
      <FormContainer>
         <Form
        onSubmit={submitHandler}
      >
        <div className='searchForm'>
        <Form.Control
          type='text'
          name='search'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Stocks'
        >
          
        </Form.Control>
        <div className='searchButton'>
        <Button type='submit'>
          Search
        </Button>
        </div>
        </div>
        
      </Form>
      </FormContainer>
     
    )
}

export default StockSearchBar;

