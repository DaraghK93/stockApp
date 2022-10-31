import { Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='notFound'>
      <br></br>
      <br></br>
      <h1>Something went wrong!</h1>
      <h2>We couldn't find this page.</h2>
      <ButtonGroup vertical style={{margin:30}}>
        <Link to='/'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm">Home</Button></Link>
      </ButtonGroup>
    </div>
  )

}
export default NotFound
