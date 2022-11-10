import {Card} from "react-bootstrap"

function SideScrollMenu(props){
    return(
        <>
        <Card className="h-100" style={{ border:"none"}}>
            <div className='cardContainer'>
                {props.children}
            </div>
            </Card>
        </>
    )
}

export default SideScrollMenu