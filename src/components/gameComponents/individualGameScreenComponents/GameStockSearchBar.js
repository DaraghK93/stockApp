import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../layout/FormContainer/FormContainer';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ScreenSelectionRadioButton from '../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton';

// Search feature fucntion which passes the user input as props
function GameStockSearchBar({ leagueId, currScreen }) {
  let { keyword } = useParams();

  const [keywords, setKeywords] = useState('');
  const [screen, setScreen] = useState(currScreen);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      navigate(`/search/game/${keywords}/${leagueId}`);
    } else {
      navigate(`/game/all/${leagueId}`);
      setKeywords('');
    }
    //reset form to blank after search
    e.target.reset();
    setKeywords('');
  };

  /// The choices for the screens, used for buttons at top of screen
  var screenChocies = [
    { name: 'All Stocksss', value: '1' },
    { name: 'Summaryss', value: '2' },
  ];

  useEffect(() => {
    if (screen === '1') {
      navigate(`/game/all/${leagueId}`);
    } else if (screen === '2') {
      navigate(`/game/summary/${leagueId}`);
    }
  }, [screen]);

  return (
    <>
      {keyword && (
        <Row className='py-3' lg={1} md={1} xs={1}>
          <ScreenSelectionRadioButton
            choices={screenChocies}
            state={screen}
            setter={setScreen}
          />
        </Row>
      )}
      <FormContainer>
        <Form onSubmit={submitHandler}>
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
