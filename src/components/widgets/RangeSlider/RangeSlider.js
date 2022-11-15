import {Form, InputGroup, Row,Col} from 'react-bootstrap'


function RangeSlider({max, min, setter, state, label}){
    return(
    <>
    <Row>
      <Col>
        <Form.Label
                  className="gameOptionsCardText"
                                  >{label}</Form.Label>
      </Col>
    </Row>
    <Row md={2} sm={2} className="rangeSliderFormControlRow">
      <Col className='rangeSliderFormControlLabel'>
       <Form.Label
           className="rangeSliderFormControlLabel gameOptionsCardText"
        >$
        </Form.Label>
      </Col>
      <Col>
        <Form.Control
            className="rangeSliderFormControl gameOptionsCardText"
            type="number"
            value={state}
            onChange = {(e) =>{setter(e.target.value)}}
          ></Form.Control>
      </Col> 
    </Row>
    <Row>
      <Col>
        <Form.Range 
          onChange = {(e) =>{setter(e.target.value)}}
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