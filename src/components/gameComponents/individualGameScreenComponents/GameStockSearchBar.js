import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../layout/FormContainer/FormContainer';

// Search feature fucntion which passes the user input as props
function GameStockSearchBar({ leagueId }) {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/game/${leagueId}/${keyword}`);
      setShowBackButton(true);
    } else {
      navigate(`/game/${leagueId}`);
      setShowBackButton(false);
      setKeyword(undefined);
    }
    //reset form to blank after search
    e.target.reset();
    setKeyword('');
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <div className='searchForm'>
            <Form.Control
              type='text'
              name='search'
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='Search Stocks'
            ></Form.Control>
            <div className='searchButton'>
              {showBackButton ? (
                <Button type='submit'>Back/Search</Button>
              ) : (
                <Button type='submit'>Search</Button>
              )}
            </div>
          </div>
        </Form>
      </FormContainer>
    </>
  );
}

export default GameStockSearchBar;
