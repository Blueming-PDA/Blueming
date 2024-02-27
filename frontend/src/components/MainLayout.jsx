// MainLayout.js
import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Container style={{ marginTop: '100px', backgroundColor: 'ivory' }}>

          <Outlet />
        </Container>
      </div>
      <Footer />
    </>
  )
}
