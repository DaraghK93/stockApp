import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../layout/FormContainer/FormContainer';
import { useParams } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import MessageAlert from '../../widgets/MessageAlert/MessageAlert';

import ScreenSelectionRadioButton from '../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton';

// Search feature fucntion which passes the user input as props
function GameStockSearchBar({ leagueId, currScreen, searchBarError, setSearchBarError }) {
  let { keyword } = useParams();

  const [keywords, setKeywords] = useState('');
  const [screen, setScreen] = useState(currScreen);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const regex = /[^a-zA-Z0-9-]/g;
    let keywordsClean = keywords.replace(regex, '');
    if (keywords && keywordsClean === '') {
      setSearchBarError(true);
    }else {
    if (keywordsClean.trim()) {
      navigate(`/search/game/${keywordsClean}/${leagueId}`);
      setSearchBarError(false);
    } else if (!keywords){
      navigate(`/game/all/${leagueId}`);
      setSearchBarError(false);
    }
  }
    //reset form to blank after search
    e.target.reset();
    setKeywords('');
  };

  /// The choices for the screens, used for buttons at top of screen
  var screenChocies = [
    { name: 'All Stocks', value: '1' },
    { name: 'Summary', value: '2' },
  ];

  useEffect(() => {
    setSearchBarError(false);
    if (screen === '1') {
      navigate(`/game/all/${leagueId}`);
      setSearchBarError(false);
    } else if (screen === '2') {
      navigate(`/game/summary/${leagueId}`);
      setSearchBarError(false);
    }
    // eslint-disable-next-line
  }, [screen, leagueId]);

  useEffect(() => {
    /// When the current screen changes reset the error
    setSearchBarError(false)
  },[currScreen, setSearchBarError])

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
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder='Search Stocks'
            ></Form.Control>
            <div className='searchButton'>
              <Button type='submit'>Search</Button>
            </div>
          </div>
        </Form>
      </FormContainer>
      {searchBarError && (
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
  );
}

export default GameStockSearchBar;
