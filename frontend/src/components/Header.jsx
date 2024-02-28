// Header.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/user";
import { fetchLogout } from "../lib/apis/auth";
import socket from "../routes/socket/socket";
import { setMessage } from "../store/reducers/message";
import logo from "/b-logo.png";
import { Link } from "react-router-dom";
import profile1 from "/profile/9334178.jpg";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.message.message);
  console.log("aptpwl", message);
  console.log(user.userInfo);

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await fetchLogout();
        dispatch(logout());

        alert("로그아웃 되었습니다.");
        navigate("/users/login");
      } catch (error) {
        console.error("로그아웃 처리 중 오류가 발생했습니다:", error);
      }
    }
  };

  const handleWriteMessage = (newMessage) => {
    dispatch(setMessage(newMessage));
    socket.emit("setHeaderMessage", newMessage);
  };

  function onKeyUp(e) {
    if (e.key === "Enter") {
      handleWriteMessage(e.target.value);
    }
  }

  socket.on("setHeaderMessageBack", async (data) => {
    console.log("message2 :: ", data);
    dispatch(setMessage(data)); // Redux 상태 업데이트
  });

  return (
    <Navbar
      className="header-top"
      fixed="top"
      style={{
        height: "12%",
        backgroundColor: "white",
      }}
    >
      <Link to="/main">
        <img
          src={logo}
          width="200px"
          className="logo-img"
          alt="Blueming logo"
          style={{ marginLeft: "50px" }}
        />
      </Link>
      <Navbar.Collapse className="justify-content-end" style={{}}>
        <Form
          className="mr-2"
          style={{ marginRight: "20px" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormControl
            className="write-message"
            type="text"
            placeholder={message}
            onKeyUp={(e) => onKeyUp(e)}
            style={{
              backgroundColor: "white",
              border: "thin solid lightgray",
            }}
          />
        </Form>

        {user.isLoggedIn && user.userInfo ? (
          <div style={{ display: "flex", marginRight: "50px" }}>
            <Nav.Link href="/users/mypage">
              <div style={{ fontSize: "17px" }}>
                {user.userInfo.profile === "none" ? (
                  <img
                    src={profile1}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  ></img>
                ) : (
                  <img
                    src={user.userInfo.profile} // 여기에 원하는 이미지의 경로를 넣어주세요
                    className="rounded-image" // 앞서 정의한 클래스 이름을 사용
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                )}
                {user.userInfo.name}님
              </div>
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <div style={{ fontSize: "17px", marginTop: "6px" }}>
                🚪 로그아웃
              </div>
            </Nav.Link>
          </div>
        ) : (
          <div style={{ marginRight: "20px" }}>
            <Nav.Link href="/users/login">
              <div style={{ fontSize: "17px" }}>👋 로그인</div>
            </Nav.Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
