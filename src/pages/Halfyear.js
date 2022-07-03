import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Halfyear = () => {
    return (
        <Card style={{ width: '95%', margin: 'auto', marginTop: 20 }}>
        <Card.Body>
        <Form.Select style={{ width: '50rem', margin: 20, marginBottom: 20, marginTop: 20 }} >
        <option>Все полугодия</option>
        <option value="1">1-ое полугодие</option>
        <option value="2">2-ое полугодие</option>
        </Form.Select>
        </Card.Body>
        </Card>
    );
};

export default Halfyear;