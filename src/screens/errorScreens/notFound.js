import { Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='notFound'>
      <br></br>
      <br></br>
      <h1>Something went wrong!</h1>
      <h2>We couldn't find this page.</h2>
      <p>Here are some useful links:</p>
      <ButtonGroup vertical>
        <Link to='/'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm">Home</Button></Link>
        <Link to='/stockdiscovery/'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm mr-1">Stock Discovery</Button></Link>
        <Link to='/register'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm mr-1">Registration</Button></Link>
        <Link to='/login'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm mr-1">Login</Button></Link>
      </ButtonGroup>

      {/* <Link to='/'><Button variant="secondary" className="btn btn-secondary btn-sm">Home</Button></Link>
      <Link to='/stockdiscovery/'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm mr-1">Stock Discovery</Button></Link>
      <Link to='/register'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm mr-1">Registration</Button></Link>
      <Link to='/login'><Button variant="secondary" className="notFoundButton btn btn-secondary btn-sm mr-1">Login</Button></Link> */}
    </div>
  )

}
export default NotFound
