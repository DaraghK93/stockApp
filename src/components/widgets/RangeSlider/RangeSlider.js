import Form from 'react-bootstrap/Form';


function RangeSlider({max, min, setter, state, label}){
    return(
    <>
      <Form.Label
        className="gameOptionsCardText"
      >{label}</Form.Label>
      <Form.Range 
        onChange = {(e) =>{setter(e.target.value)}}
        value={state}
        min={min}
        max={max}
      />
    </>
    )
}

export default RangeSlider