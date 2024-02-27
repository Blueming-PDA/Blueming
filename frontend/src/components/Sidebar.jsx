// Sidebar.js
import React from 'react'
import { Nav } from 'react-bootstrap'
import logo from '/bluemingLogo2.png';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column"
      style={{
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        width: '200px',
        overflow: 'auto',
        backgroundColor: 'white',
        color: 'black',
        // borderRight: '2px solid lightgray',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)'
      }}
    >
      <img
        src={logo}
        width='200'
        className="d-inline-block align-top"
        alt="Blueming logo"
      />
      <Nav.Link href="/" className="nav-link" style={{ color: 'gray', fontWeight: 'bold', fontSize: '20px' }}>대시보드</Nav.Link>
      <Nav.Link href="/board" className="nav-link" style={{ color: 'gray', fontWeight: 'bold', fontSize: '20px' }}>자유게시판</Nav.Link>
      <Nav.Link href="/assignment" className="nav-link" style={{ color: 'gray', fontWeight: 'bold', fontSize: '20px' }}>과제함</Nav.Link>
      <Nav.Link href="/notice" className="nav-link" style={{ color: 'gray', fontWeight: 'bold', fontSize: '20px' }}>공지사항</Nav.Link>
      <Nav.Link href="/settings" className="nav-link" style={{ color: 'gray', fontWeight: 'bold', fontSize: '20px' }}>설정</Nav.Link>
    </Nav>
  )
}


export default Sidebar
