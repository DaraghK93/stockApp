import {Form,Row,Col} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"
import MessageAlert from '../MessageAlert/MessageAlert'


function RangeSlider({max, min, setter, state, label, startWidth, disabled,showError}){
  const [width, setWidth] = useState(startWidth)
  const [error, setError] = useState("")
  const [valueState, setValueState] = useState(state)

  useEffect(() => {
    if(state.length === 1 || state.length === 0){
        setWidth("2rem")
    }else if(state.length === 2){
      setWidth("2.75rem")
    }else if(state.length === 3){
      setWidth("3.75rem")
    }else if(state.length === 4){
      setWidth("4.75rem")
    }else if(state.length === 5){
      setWidth("5.75rem")
    }else if(state.length === 6){
      setWidth("6.75rem")
    }else if(state.length === 7){
      setWidth("7.75rem")
    }
  },[state])


  function handleSubmit(e) {
    setError("")
    setValueState(e.target.value)
    var value = parseInt(e.target.value)
    if ((value < min || value > max) && showError){
      setError(`Must be between ${min} and ${max}`)
    }
    setter(e.target.value)
  }

  
  return(
    <>
    {error && <MessageAlert variant="danger">{error}</MessageAlert>}
    {typeof width === "undefined" ? <LoadingSpinner/>
    :
    <> 
    <Row>
      <Col>
        <span className="gameOptionsCardText">{label}</span>
        <Form.Label
          className="gameOptionsCardText">
            <Form.Control
              type="number"
              className="rangeSliderFormControl gameOptionsCardText"
              value={valueState}
              onChange = {handleSubmit}
              style={{"width":width}}
              disabled={disabled}
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
    }
    </>
    )
}

export default RangeSlider