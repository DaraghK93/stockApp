import { Container, Button, Card, Row, Col, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";

function PortfolioOverallViz() {
    const dummyData = [
        { date: '01-10', price: 400 },
        { date: '01-11', price: 700 },
        { date: '01-12', price: 60 },
        { date: '01-13', price: 700 },
        { date: '01-14', price: 500 },
        { date: '01-15', price: 400 },
        { date: '01-16', price: 700 },
        { date: '01-17', price: 60 },
        { date: '01-18', price: 700 },
        { date: '01-19', price: 500 },
        { date: '01-20', price: 400 },
        { date: '01-21', price: 700 },
        { date: '01-22', price: 60 },
        { date: '01-23', price: 700 },
        { date: '01-24', price: 500 },
    ]



    return (
        <>
            <h1>Overall Value</h1>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                    Portfolio A
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Portfolio A</Dropdown.Item>
                    <Dropdown.Item>Portfolio B</Dropdown.Item>
                    <Dropdown.Item>Portfolio C</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default PortfolioOverallViz;