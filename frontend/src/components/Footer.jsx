// Footer.js
import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="dark" variant='dark' style={{ marginLeft: '200px' }}>
      <Container>
        <Navbar.Text>&copy; 2024 Blueming </Navbar.Text>
        <Navbar.Text>김미래</Navbar.Text>
        <Navbar.Text>김시은</Navbar.Text>
        <Navbar.Text>박서희</Navbar.Text>
        <Navbar.Text>한다현</Navbar.Text>
      </Container>
    </Navbar>
  )
}

export default Footer
