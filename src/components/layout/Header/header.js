import {
  Navbar,
  Container,
  NavDropdown,
  Nav
} from 'react-bootstrap'

import { NavLink } from 'react-router-dom';

import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
/// Redux ///
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../actions/userActions'


function Header() {
  const [active, setActive] = useState("")
  const [expanded, setExpanded] = useState(false);


  
  const setActiveLink = (e) => {
    setActive(e.target.id)
    setExpanded(false)
  }


  /// Redux ///
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  // Get the userInfo piece of state, dont need loading and error
  // The users name will be shown in top corner of nav 
  const { userInfo } = user;


  // logoutHandler //
  // Called when the logout button is pressed 
  function logoutHandler() {
    // dispatch the logout action 
    dispatch(logout());
  }

  return (
    <Navbar expanded={expanded} fixed="top" expand="lg" variant="dark"
      className="navbar">
      <Container>
        <Navbar.Brand style={{ color: 'white' }} as={NavLink} to="/game">FIN<span className="navbar-brand mb-0 h1">OPTIMISE</span></Navbar.Brand>
        <Navbar.Toggle style={{ color: "white" }} onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {userInfo ?
            (
              <>
                <Nav className="container-fluid">
                  <Nav.Link id={"2"} onClick={setActiveLink} as={NavLink} className={active === "2" ? 'navlinkactive' : "navlink"} to="/game">Game</Nav.Link>
                  <Nav.Link id={"1"} onClick={setActiveLink} as={NavLink} className={active === "1" ? 'navlinkactive' : "navlink"} to="/stockdiscovery/">Explore</Nav.Link>
                  <Nav.Link id={"3"} onClick={setActiveLink} as={NavLink} className={active === "3" ? 'navlinkactive' : "navlink"} to="/faqs">Learn</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown  className="justify-content-end userDropDown"  title={<span className="userDropDownTitle">{userInfo.firstname}</span>}>
                  <NavDropdown.Item as={NavLink}  to="/settings"><SettingsIcon></SettingsIcon> Settings</NavDropdown.Item>
                  <div className="dropdown-divider"></div>
                <NavDropdown.Item onClick={logoutHandler} ><LogoutIcon></LogoutIcon> Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
               
                
              </>)
            :
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/register" style={{ color: 'white' }}>Register</Nav.Link>
              <Nav.Link as={NavLink} to="/login" style={{ color: 'white' }}>Login</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;