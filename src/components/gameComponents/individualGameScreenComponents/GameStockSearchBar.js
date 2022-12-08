import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../layout/FormContainer/FormContainer';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Search feature fucntion which passes the user input as props
function GameStockSearchBar({ leagueId }) {
  let { keyword } = useParams();

  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      navigate(`/search/game/${keywords}/${leagueId}`);
    } else {
      navigate(`/game/${leagueId}`);
      setKeywords('');
    }
    //reset form to blank after search
    e.target.reset();
    setKeywords('');
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {keyword && (
            <Row>
              <Col style={{ alignItems: 'center' }} className='text-center'>
                <Button type='submit' style={{ width: '10rem' }}>
                  Toggle all stocks
                </Button>{' '}
              </Col>
            </Row>
          )}
          <div className='searchForm'>
            <Form.Control
              type='text'
              name='search'
              onChange={(e) => setKeywords(e.target.value)}
              placeholder='Search Stocks'
            ></Form.Control>
            <div className='searchButton'>
              <Button type='submit'>Search</Button>
            </div>
          </div>
        </Form>
      </FormContainer>
    </>
  );
}

export default GameStockSearchBar;
