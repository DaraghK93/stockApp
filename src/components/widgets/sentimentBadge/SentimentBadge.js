import {Badge} from "react-bootstrap";

/// SentimentBadge ///
//  Passed to it is the sentiment of positive, Neutral or Negative
//  Returned is a badge which changes colour depedning upon sentiment
function SentimentBadge({sentiment}){
    let classVal = ''
    if (sentiment === 'Positive'){
                    return <Badge className='positiveSentimentBadge'>{sentiment}</Badge>
                }else if (sentiment === 'Neutral'){
                    classVal = 'neutralSentimentBadge'
                }else if (sentiment === 'Negative'){
                    return <Badge className='negativeSentimentBadge'>{sentiment}</Badge>
                }
    return(
        <Badge className={classVal}>{sentiment}</Badge>
    )
}


export default SentimentBadge;