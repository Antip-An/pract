import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import "./css/halfyear.css";

const Halfyear = () => {
    return (
        <Card style={{ width: '95%', margin: 'auto', marginTop: 20 }}>
        <Card.Body>
        <Form.Select className="half">
        <option>Все полугодия</option>
        <option value="1">1-ое полугодие</option>
        <option value="2">2-ое полугодие</option>
        </Form.Select>
        </Card.Body>
        </Card>
    );
};

export default Halfyear;