import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function StockSearchBar() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Type here to search stocks" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Search Stocks
      </Button>
    </Form>
  );
}

export default StockSearchBar;

