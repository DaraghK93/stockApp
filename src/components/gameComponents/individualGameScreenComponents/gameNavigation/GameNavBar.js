import { Navbar, Container, Nav } from 'react-bootstrap'

function GameNavBar({ disPlayScreen, active }) {

    return (
        <Navbar expand="lg" className="navbar navbar-expand" variant="dark">
            <Container>
                <Nav className="me-auto" >
                    <Nav.Link id={"4"} className={active === "4" ? 'navlinkactive' : "navlink"} onClick={disPlayScreen}>Leaderboard</Nav.Link>
                    <Nav.Link id={"1"} className={active === "1" ? 'navlinkactive' : "navlink"} onClick={disPlayScreen}>Details</Nav.Link>
                    <Nav.Link id={"2"} className={active === "2" ? 'navlinkactive' : "navlink"} onClick={disPlayScreen}>Trade</Nav.Link>
                    <Nav.Link id={"3"} className={active === "3" ? 'navlinkactive' : "navlink"} onClick={disPlayScreen}>Portfolio</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default GameNavBar;
