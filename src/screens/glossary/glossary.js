/// Glossary Screen ///
// Route:
//  <URL>/glossary
// Description:
//  This screen contains a static glossary page

/// Imports ///
import { Container, Row, Col, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import CollapsibleTable from "../../components/glossaryComponents/collabsibleTable/collapsibleTable"



function GlossaryPage (){
    

    return(
        <Container>
            <Col>
                <Row>
                    <CollapsibleTable/>
                </Row>
                </Col>
        </Container>
    )

}


export default GlossaryPage