/// Description:
//      This file holds the component for the loading spinner which should be used on 
//      every page when it is loading or an individual component is loading 


/// Imports ///
// spinner - Bootstrap loading spinner https://react-bootstrap.github.io/components/spinners/
import {Spinner} from 'react-bootstrap';

/// LoadingSpinner ///
// Description:
//     Uses react bootstrap component 
function LoadingSpinner(){
    return(
        <Spinner
            animation='border'
            variant = 'dark'
            style = {{
                width: '4rem', 
                height: '4rem',
                margin:'auto',
                display:'block'
            }}
        >
        </Spinner>
    )
}

export default LoadingSpinner; 