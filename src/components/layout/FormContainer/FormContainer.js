/// Description:
///     Used for holding a Form and having same breakpoints for all forms 

/// Bootstrap ///
import { Container,Row,Col } from "react-bootstrap";


function FormContainer ({children}){
    return(
        <Container>
            <Row className='justify-content-center'> {/*Justify center on medium size screens*/}
                <Col xs={12} md={5}> {/*Small screen fit 12 cols next to eachother, medium screen fit 5*/}
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;