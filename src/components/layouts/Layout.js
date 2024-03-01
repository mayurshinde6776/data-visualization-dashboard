// src/components/layouts/Layout.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Filters from '../filters/Filters';
import Charts from '../charts/Charts';

const Layout = ({ data, onFilterChange }) => {
    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <Filters onFilterChange={onFilterChange} />
                </Col>
                <Col sm={8}>
                    <Charts data={data} />
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
