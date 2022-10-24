import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import { Container } from "react-bootstrap";
import { useState } from "react";

function OrderConfirmationPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (

        <>
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :

                <Container>
                    <h1>Order Confirmation</h1>
                </Container>

            }
        </>
    )
}

export default OrderConfirmationPage;