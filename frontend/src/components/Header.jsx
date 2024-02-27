// Header.js
import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/reducers/user';
import { fetchLogout } from '../lib/apis/auth';

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        fetchLogout().then((resp) => {
          dispatch(logout());
          alert('로그아웃 되었습니다.');
          navigate('/users/login');
        });
      } catch (error) {
        console.error('로그아웃 처리 중 오류가 발생했습니다:', error);
      }
    }
  }

  const TEXT = "오늘도 화이팅!!";



  return (
    <Navbar
      fixed="top"
      style={{
        height: 80, marginLeft: '201px', boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white'
      }}>

      <Navbar.Collapse className="justify-content-end" style={{ gap: 20, marginRight: 10 }}>
        <Form className="mr-2">
          <FormControl type="text" placeholder={TEXT} className="mr-2" style={{ backgroundColor: 'lightblue' }} />
        </Form>

        {!user.isLoggedIn ? (
          <>
            <Nav.Link href='/users/login' className="text-center border border-info border-end-0">로그인</Nav.Link>
          </>
        ) : (
          <>
            <Nav>{user.userInfo.name}님</Nav>
            <Nav.Link href='/users/mypage' className=" text-center border border-info">
              <i className="bi bi-person-fill"></i>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="flex-grow text-center border border-info">
              <i className="bi bi-door-open"></i>
            </Nav.Link>
          </>
        )}

      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
