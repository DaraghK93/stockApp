import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom"
import FormContainer from '../../layout/FormContainer/FormContainer';
import { Row, Col, Container } from 'react-bootstrap';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';


// Search feature fucntion which passes the user input as props
function StockSearchBar() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const [displayBadSearch, setDisplayBadSearch] = useState(false);

  const submitHandler = (e) => {
    const regex = /[^a-zA-Z0-9-\s]/g;
    let keywordsClean = keyword.replace(regex, "");
    if(keyword && keywordsClean === ""){
      setDisplayBadSearch(true);
    }
    e.preventDefault()
    if(keywordsClean.trim()){
      navigate(`/search/stock/${keywordsClean}`)
      setDisplayBadSearch(false)
    }else{
      navigate(`/stockdiscovery/`)
    }
    // reset form to blank after search
    e.target.reset()
    setKeyword("")
  }


    return(<>
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
      {displayBadSearch && (          
      <Container>
        <Row>
          <Col className='text-center mx-5'>
            <MessageAlert variant='danger'>
              Invalid search term. Please try again
            </MessageAlert>
          </Col>
        </Row>
      </Container>
      )}
   </>  
    )
}

export default StockSearchBar;

