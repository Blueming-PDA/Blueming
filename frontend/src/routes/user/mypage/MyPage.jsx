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
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Link, redirect, useNavigate } from "react-router-dom";
import { fetchMypageBoardList } from "../../../lib/apis/board";
import PasswordChangeModal from "./PasswordChangeModal";
import { fetchLogout } from "../../../lib/apis/auth";
import { logout } from "../../../store/reducers/user";
import { Form } from "react-bootstrap";
import "./MyPage.css";
import { setSid } from "../../socket/socketEvents";

const ProfilePage = () => {
  // 사용자가 작성한 게시글 목록을 가정한 예시 데이터
  const userPosts = [
    { id: 1, title: "First Post", content: "Content of the first post" },
    { id: 2, title: "Second Post", content: "Content of the second post" },
    // 다른 게시글 데이터들...
  ];

  const [showModal, setShowModal] = useState(false);
  const [MypageBoardList, setMyPageBoardList] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const postsPerPage = 5;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  useEffect(() => {
    if(userObj) {
      setSid(userObj);
    }
  }, []); 
  // console.log(userObj);

  useEffect(() => {
    fetchMypageBoardList(userObj._id).then((data) => {
      setMyPageBoardList(data);
      setFilteredBoardData(data);
    });
  }, []);

  // 모달을 표시하는 함수
  const handleShowModal = () => {
    setShowModal(true);
  };

  // 모달을 숨기는 함수 (PasswordChangeModal 컴포넌트에 전달)
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //보드 검색해서 띄우는 함수
  const handleSearch = () => {
    const filteredData = MypageBoardList.filter((data) =>
      data.boardTitle.toLowerCase().includes(search.toLowerCase())
    );
    // console.log(filteredBoardData);
    setFilteredBoardData(filteredData);
    setPage(1);
  };

  function onKeyUp(e) {
    if (e.key === "Enter") {
      handleSearch();
      setPage(1);
    }
  }

  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBoardData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <Container className="myPageContainer">
      <Row>
        <Col xs={12} md={6} className="text-center">
          {/* 프로필 사진과 내 정보 */}
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profileImage"
          />

          <div className="myInfoBox">
            <div
              className="infoContents"
              style={{ marginLeft: "30px", textAlign: "left" }}
            >
              <p>
                <strong>Email </strong>
                {userObj.email}
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
              <Button className="passwordbtn" onClick={handleShowModal}>
                <span className="passwordbtnName">비밀번호 변경</span>
              </Button>
              <span className="passwordContent">
                비밀번호 변경시,<br></br> 비밀번호 재입력이 필요합니다.
              </span>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} className="searchLayout">
          {/* 내가 쓴 글 목록 */}
          <Container className="min-vh-100">
            {/* ... 검색 바 및 리스트 그룹 ... */}
            {/* 검색 바 */}
            <div className="search-bar">
              <Form.Control
                className="me-2"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={onKeyUp}
              />
              <Button
                className="searchbtn"
                onClick={() => {
                  handleSearch();
                  setPage(1);
                }}
              >
                검색
              </Button>
            </div>
            {/* 글 목록 */}
            <ListGroup as="ul" style={{ marginTop: "10px" }}>
              {currentPosts.map((item, index) => (
                <Link
                  key={index}
                  to={`/board/${item._id}`}
                  className="text-decoration-none"
                >
                  <ListGroup.Item
                    key={index}
                    as="li"
                    action
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto text-truncate">
                      <div className="fw-bold">{item.boardTitle}</div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-end">
                      <Badge bg="primary" pill>
                        {/* 14 */}1{/* {item.commentCount} */}
                      </Badge>
                      <div>
                        {new Date(item.createdAt).toISOString().split("T")[0]}
                      </div>
                    </div>
                  </ListGroup.Item>
                </Link>
              ))}
            </ListGroup>
            {/* 페이지네이션 */}
            <PaginationControl
              page={page}
              between={4}
              total={filteredBoardData.length}
              limit={postsPerPage}
              changePage={(page) => setPage(page)}
              ellipsis={1}
            />
          </Container>
        </Col>
      </Row>
      {/* 비밀번호 변경 모달 */}
      <PasswordChangeModal show={showModal} onHide={handleCloseModal} />
    </Container>
  );
};

export default ProfilePage;
