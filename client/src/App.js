import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import WarehouseStockMovementScreen from './screens/Warehouse';
import ProductForm from './screens/Product';
import { Row, Col, Container } from 'react-bootstrap';

export default function App() {
  return (
    <BrowserRouter>
      <Container className="mt-5">
        <Row>
          <Col>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/warehouse" element={<WarehouseStockMovementScreen />} />
              <Route path="/product" element={<ProductForm />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}