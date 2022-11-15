import {Form, InputGroup, Row,Col} from 'react-bootstrap'
import { useState, useEffect } from 'react'

import MessageAlert from '../MessageAlert/MessageAlert'


function RangeSlider({max, min, setter, state, label, startWidth}){
  const [width, setWidth] = useState(startWidth)
  const [error, setError] = useState("")

  useEffect(() => {
    if(state.length === 1){
        setWidth("2rem")
    }else if(state.length === 2){
      setWidth("2.5rem")
    }else if(state.length === 3){
      setWidth("3.5rem")
    }else if(state.length === 4){
      setWidth("4.1rem")
    }else if(state.length === 5){
      setWidth("5rem")
    }else if(state.length === 6){
      setWidth("5.75rem")
    }else if(state.length === 7){
      setWidth("6.7rem")
    }
  },[state])

 

  function handleSubmit(e) {
    setError("")
    var value = parseInt(e.target.value)
    if (value >= min && value <= max){
      setter(e.target.value)
    }else{
      setError(`Must be between ${min} and ${max}`)
    }
  }

  
  return(
    <>
    {error && <MessageAlert variant="info">{error}</MessageAlert>}
    <Row>
      <Col>
        <span className="gameOptionsCardText">{label}</span>
        <Form.Label
          className="gameOptionsCardText">
            <Form.Control
              type="number"
              className="rangeSliderFormControl gameOptionsCardText"
              value={state}
              onChange = {handleSubmit}
              style={{"width":width}}
            >
            </Form.Control>
          </Form.Label>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form.Range 
          onChange = {handleSubmit}
          value={state}
          min={min}
          max={max}
        />
      </Col>
    </Row>
      

    
     
    </>
    )
}

export default RangeSlider