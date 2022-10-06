/// Description:
//  This file holds the component for the message bar which is displayed to the user 
//  Depending upon the type of meessage the colour of the message bar should change 

/// Imports ///
// Alert - Bootstrap component https://react-bootstrap.github.io/components/alerts/ 
import {Alert} from 'react-bootstrap';


/// MessageAlert ///
// Description:
//  Used to alert user 
//  Props:
//      variant  - This is bootsrap variant, can be changed later https://bootstrap-vue.org/docs/reference/color-variants
//      children - This is will contain the text to display along with anythin else, see here for more info https://reactjs.org/docs/composition-vs-inheritance.html 
function MessageAlert({variant,children}){
    // Ser variant and place the children prop insdie alert 
    return(
        <Alert className="m-3" variant={variant}>
            {children}
        </Alert>
    )
}

export default MessageAlert;