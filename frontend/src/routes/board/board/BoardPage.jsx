import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { fetchBoardList, fetchBoardCommentList } from "~/lib/apis/board";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function timeAgo(updatedAt) {
  const now = new Date();
  const updatedTime = new Date(updatedAt);

  const secondsPast = (now.getTime() - updatedTime.getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + "초 전";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "분 전";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "시간 전";
  }
  if (secondsPast > 86400) {
    let month = (updatedTime.getMonth() + 1).toString();
    let date = updatedTime.getDate().toString();
    let hours = updatedTime.getHours().toString();
    let minutes = updatedTime.getMinutes().toString();

    month = month.length < 2 ? "0" + month : month;
    date = date.length < 2 ? "0" + date : date;
    hours = hours.length < 2 ? "0" + hours : hours;
    minutes = minutes.length < 2 ? "0" + minutes : minutes;

    return `${month}.${date} ${hours}:${minutes}`;
  }
}

export default function BoardWritePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [boardData, setBoardData] = useState([]);
  const [filteredBoardData, setFilteredBoardData] = useState([]);
  const navigate = useNavigate();
  const postsPerPage = 5;
  const boardType = "board";

  const userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  console.log(userObj);
  const callCommentData = async (boardId) => {
    try {
      if (boardId !== undefined) {
        const comments = await fetchBoardCommentList(boardType, boardId);

        const filteredComments = comments.comments.filter(
          (comment) => comment.commentContent !== "삭제된 댓글입니다."
        );
        return filteredComments.length;
      }
    } catch (error) {
      console.error("댓글 데이터 호출 중 에러:", error);
    }
  };

  const callBoardData = async () => {
    try {
      const response = await fetchBoardList(boardType);
      const boardDataWithComments = await Promise.all(
        response.reverse().map(async (board) => {
          const commentCount = await callCommentData(board._id);
          return { ...board, commentCount };
        })
      );
      setBoardData(boardDataWithComments);
      setFilteredBoardData(boardDataWithComments);
    } catch (error) {
      console.error("보드 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callBoardData();
    callCommentData();
  }, []);

  const handleSearch = () => {
    const filteredData = boardData.filter((data) =>
      data.boardTitle.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredBoardData(filteredData);
    setPage(1);
  };

  function onKeyUp(e) {
    if (e.key == "Enter") {
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
    <Container className="board-page">
      <div className="search-bar">
        <Form.Control
          className="search-form"
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => onKeyUp(e)}
        />
        <Button
          className="search-btn"
          onClick={() => {
            handleSearch();
            setPage(1);
          }}
        >
          검색
        </Button>
      </div>
      <div className="write-board">
        <Link
          to={`/board/write`}
          preventScrollReset
          className="text-decoration-none"
        >
          {userObj !== null ? (
            <Button className="write-board-btn">등록</Button>
          ) : (
            ""
          )}
        </Link>
      </div>

      <div className="board-list">
        {currentPosts.map((data, index) => (
          <div>
            <Link
              to={`/board/${data._id}`}
              key={data._id}
              preventScrollReset
              className="text-decoration-none"
            >
              <div key={index} className="board">
                <div className="board-title-tag">
                  <div className="board-title-comment">
                    {data.boardTitle}{" "}
                    {data.commentCount ? "(" + data.commentCount + ")" : null}
                  </div>
                  {data.tag &&
                    data.tag.map((boardTag) => (
                      <div className="board-tag">{boardTag}</div>
                    ))}
                </div>
                <div className="writer-date">
                  <strong>{data.isAnonymous ? "익명" : data.userName}</strong> /{" "}
                  {timeAgo(data.updatedAt)}{" "}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <PaginationControl
        page={page}
        between={4}
        total={filteredBoardData.length}
        limit={postsPerPage}
        changePage={(page) => {
          setPage(page);
        }}
        ellipsis={1}
      />
    </Container>
  );
}
