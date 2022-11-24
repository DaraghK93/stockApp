import {
    Navbar,
    Container,
    NavDropdown,
    Nav
} from 'react-bootstrap'

import {Link} from 'react-router-dom';

import {useState} from "react";


/// Redux ///
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../../../actions/userActions'


function Header() {
  const [active,setActive] = useState("")

  /// Redux ///
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user)
  // Get the userInfo piece of state, dont need loading and error
  // The users name will be shown in top corner of nav 
  const {userInfo} = user; 


  // logoutHandler //
  // Called when the logout button is pressed 
  function logoutHandler(){
    // dispatch the logout action 
    dispatch(logout());
  }

  const setActiveLink = (e) => {
    setActive(e.target.id)
  }

  return (
    <Navbar expand="lg" variant="dark"
    className="navbar">
      <Container>
        <Navbar.Brand style={{color:'white'}} as={Link} to="/">FIN<span className="navbar-brand mb-0 h1">OPTIMISE</span></Navbar.Brand>
        <Navbar.Toggle style={{ color:"white"}} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
             {userInfo ?
              (
              <>
              <Nav>
                <Nav.Link id={"1"} onClick={setActiveLink} as={Link} className={active === "1" ? 'navlinkactive' : "navlink"} to="/stockdiscovery/">Stocks</Nav.Link>
                <Nav.Link id={"2"} onClick={setActiveLink} as={Link} className={active === "2" ? 'navlinkactive' : "navlink"} to="/game">Game</Nav.Link>
              </Nav>
              <NavDropdown  className="userDropDown" title={<span className="userDropDownTitle">{userInfo.firstname}</span>}>
                <NavDropdown.Item  as={Link}  to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link}  to="/myportfolios">My Portfolios</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
              </NavDropdown>
             </> )
              :
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/register" style={{color:'white'}}>Register</Nav.Link>
                <Nav.Link as={Link} to="/login"style={{color:'white'}}>Login</Nav.Link>
              </Nav>
             }
        </Navbar.Collapse>   
      </Container>
    </Navbar>
  );
}

export default Header;