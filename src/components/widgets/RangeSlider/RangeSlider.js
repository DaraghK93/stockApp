import Form from 'react-bootstrap/Form';


function RangeSlider(max, min, setter, state, label){
    return(
    <>
      <Form.Label>Range</Form.Label>
      <Form.Range />
    </>
    )
}

export default RangeSlider