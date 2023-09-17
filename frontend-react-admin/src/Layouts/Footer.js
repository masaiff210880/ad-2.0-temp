import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
    return (
        <React.Fragment>
            <div style={{background:"#094C89"}}>
            <footer className="footer 	bg-info-subtle">
            <Container fluid>
                    <Row>
                        <Col sm={6}>
                        <div className="text-black">
                            {new Date().getFullYear()} © Phantasm
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block text-black">
                                Design & Develop by Phantasm Digital works
                            </div>
                        </Col>
                    </Row>
                </Container>

            </footer>
            </div>
        </React.Fragment>
    );
};

export default Footer;