import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";
import { fetchMypageBoardList } from "../../../lib/apis/board";
import PasswordChangeModal from "./PasswordChangeModal";
import { fetchLogout } from "../../../lib/apis/auth";
import { logout } from "../../../store/reducers/user";

const ProfilePage = () => {
  // 사용자가 작성한 게시글 목록을 가정한 예시 데이터
  const userPosts = [
    { id: 1, title: "First Post", content: "Content of the first post" },
    { id: 2, title: "Second Post", content: "Content of the second post" },
    // 다른 게시글 데이터들...
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObj = useSelector((state) => {
    return state.user.userInfo;
  });
  // console.log(userObj);

  const [MypageBoardList, setMyPageBoardList] = useState([]);
  useEffect(() => {
    fetchMypageBoardList(userObj._id).then((data) => {
      // console.log(data);
      setMyPageBoardList(data);
    });
  }, []);

  const [showModal, setShowModal] = useState(false);

  // 모달을 표시하는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // 모달을 숨기는 함수 (PasswordChangeModal 컴포넌트에 전달)
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    fetchLogout().then((resp) => {
      navigate("/users/login");
    });
    dispatch(logout());
  };

  //보드 검색해서 띄우는 함수
  const handleFindBoard = () => {};

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          {/* 프로필 사진 */}
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="img-fluid rounded-circle"
          />
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs={12} md={8}>
          {/* 사용자 정보 상자 */}
          <div
            className="bg-white p-3 rounded"
            style={{ border: "2px solid #939393" }}
          >
            <h3 className="mb-4">내 정보</h3>
            <div style={{ marginLeft: "30px", textAlign: "left" }}>
              <p>
                <strong>Email </strong> {userObj.email}
              </p>
              <p>
                <strong>Name </strong> {userObj.name}
              </p>
              <p>
                <strong>Phone </strong> {userObj.phone}
              </p>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginLeft: "30px", marginBottom: "20px" }}
            >
              <Button variant="secondary" onClick={handleShowModal}>
                비밀번호 변경
              </Button>
              <span style={{ marginLeft: "1rem" }}>
                {" "}
                {/* 16px 혹은 원하는 크기로 조절 */}
                비밀번호 변경시, 비밀번호 재입력이 필요합니다.
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs={12} md={10}>
          <Container className="min-vh-100" style={{ width: "80%" }}>
            <div
              className="d-flex mb-3 flex-row justify-content-between flex-wrap"
              style={{ marginTop: "10px" }}
            >
              <h3>내가 쓴 글</h3>
              <div>
                <input type="text" />
                <Button
                  variant="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={handleShowModal}
                >
                  검색
                </Button>
              </div>
            </div>

            <ListGroup as="ul" style={{ marginTop: "10px" }}>
              {userPosts.map((item, index) => (
                <Link
                  key={item._id}
                  to={`/board`}
                  className="text-decoration-none"
                >
                  <ListGroup.Item
                    key={index}
                    as="li"
                    action
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto text-truncate">
                      <div className="fw-bold">{item.title}</div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-end">
                      <Badge bg="primary" pill>
                        {/* 14 */}1{/* {item.commentCount} */}
                      </Badge>
                      <div>작성일</div>
                      {/* {item.createdAt} */}
                    </div>
                  </ListGroup.Item>
                </Link>
              ))}
            </ListGroup>
          </Container>
        </Col>
      </Row>
      <Button onClick={handleLogout}>로그아웃</Button>
      <PasswordChangeModal show={showModal} onHide={handleCloseModal} />
    </Container>
  );
};

export default ProfilePage;
