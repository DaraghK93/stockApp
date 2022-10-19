import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
    return (
        <footer className='footerStyle'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; FIN<span className="navbar-brand mb-0 h1">OPTIMIZE</span></Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer