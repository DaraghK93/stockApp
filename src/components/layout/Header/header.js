// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

import {
    Navbar,
    Container,
    NavDropdown,
    Nav
} from 'react-bootstrap'

import {Link} from 'react-router-dom';


/// Redux ///
import {useSelector} from 'react-redux';


function Header() {

  /// Redux ///
  const user = useSelector((state) => state.user)
  // Get the userInfo piece of state, dont need loading and error 
  const {userInfo} = user; 





  return (
    <header className="pb-4">
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">FIN<span className="navbar-brand mb-0 h1">OPTIMIZE</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/stockdiscovery">Stocks</Nav.Link>
          </Nav>
          <Nav>
             {userInfo ?
              (<NavDropdown align="end" title={userInfo.firstname}>
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/portfolio">My Portfolio</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>)
              :<Nav.Link as={Link} to="/login">Login</Nav.Link> 
             }
          </Nav>
        </Navbar.Collapse>   
      </Container>
    </Navbar>
    </header>
  );
}

export default Header;