import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import {
  fetchBoardDetail,
  fetchBoardCommentList,
  fetchBoardDelete,
  fetchBoardCommentWrite,
  fetchBoardCommentDelete,
  fetchBoardCommentReplyWrite,
  fetchBoardCommentReplyDelete,
} from "~/lib/apis/board";
import { useParams, Link, useNavigate } from "react-router-dom";
import { timeAgo } from "../NoticePage";

export default function BoardDetailPage() {
  const [commentData, setCommentData] = useState([]);
  const [writeComment, setWriteComment] = useState("");
  const [writeCommentReply, setWriteCommentReply] = useState("");
  const [boardData, setBoardData] = useState([]);
  const [anonymous, setAnonymous] = useState(0);
  const [replyAnonymous, setReplyAnonymous] = useState(0);
  const [replyTo, setReplyTo] = useState(null);
  const boardType = "notice";

  const params = useParams();
  const navigate = useNavigate();

  const callCommentData = async () => {
    try {
      const response = await fetchBoardCommentList(boardType, params.boardId);
      setCommentData(response.comments);
    } catch (error) {
      console.error("상세 페이지 댓글 데이터 호출 중 에러:", error);
    }
  };

  const callBoardData = async () => {
    try {
      const response = await fetchBoardDetail(boardType, params.boardId);
      setBoardData(response);
    } catch (error) {
      console.error("상세 페이지 보드 데이터 호출 중 에러:", error);
    }
  };

  const handleDelete = async () => {
    try {
      fetchBoardDelete(boardType, params.boardId);
      navigate(-1);
      alert("삭제 완료");
    } catch (error) {
      console.error("글 삭제 중 에러 발생:", error);
    }
  };

  const handleAnonymous = (e) => {
    setAnonymous(e.target.checked);
  };

  const handleReplyAnonymous = (e) => {
    setReplyAnonymous(e.target.checked);
  };

  const handleCommentWrite = async () => {
    try {
      fetchBoardCommentWrite(boardType, params.boardId, {
        commentContent: writeComment,
        isAnonymous: anonymous,
        depth: 0,
      });
      window.location.reload(true);
    } catch (error) {
      console.error("댓글 작성 중 에러 발생:", error);
    }
  };

  const handleCommentReplyWrite = async (commentId) => {
    try {
      fetchBoardCommentReplyWrite(boardType, params.boardId, commentId, {
        commentContent: writeCommentReply,
        isAnonymous: replyAnonymous,
        depth: 1,
      });

      setWriteCommentReply("");
      setReplyAnonymous(0);
      window.location.reload(true);
    } catch (error) {
      console.error("대댓글 작성 중 에러 발생:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      fetchBoardCommentDelete(boardType, params.boardId, commentId);
      window.location.reload(true);
    } catch (error) {
      console.error("댓글 삭제 중 에러 발생:", error);
    }
  };
  const handleCommentReplyDelete = async (commentId, commentReplyId) => {
    try {
      fetchBoardCommentReplyDelete(
        boardType,
        params.boardId,
        commentId,
        commentReplyId
      );
      window.location.reload(true);
    } catch (error) {
      console.error("대댓글 삭제 중 에러 발생:", error);
    }
  };

  function onKeyUp(e) {
    if (e.key == "Enter") {
      handleCommentWrite();
    }
  }

  function onKeyUpReply(e, data_id) {
    if (e.key == "Enter") {
      handleCommentReplyWrite(data_id);
    }
  }

  useEffect(() => {
    callBoardData();
    callCommentData();
  }, []);

  return (
    <Container className="board-detail-page">
      <div className="board-detail-all">
        <div className="board-detail-tag-container">
          {boardData.tag &&
            boardData.tag.map((boardDetailTag) => (
              <div className="board-detail-tag">{boardDetailTag}</div>
            ))}
        </div>
        <div className="board-detail-title">
          <h1>{boardData.boardTitle}</h1>
        </div>

        <div className="board-writer-date-btns">
          <div className="board-writer-date">
            <strong>{boardData.isAnonymous ? "익명" : boardData.writer}</strong>{" "}
            / {timeAgo(boardData.updatedAt)}{" "}
            {boardData.updatedAt !== boardData.createdAt ? "(수정)" : null}
          </div>
          <div className="board-detail-btns">
            <Link
              to={`/${boardType}/${params.boardId}/edit`}
              preventScrollReset
              className="text-decoration-none"
            >
              <button className="board-btn-edit">수정</button>
            </Link>
            <button
              className="board-btn-del"
              onClick={() => {
                handleDelete();
              }}
            >
              삭제
            </button>
          </div>
        </div>
        <div className="board-content">{boardData.boardContent}</div>
      </div>
      <hr className="line"></hr>
      <div className="board-comment-all">
        <div className="board-comment-num">
          <h5>
            {
              commentData.filter(
                (comment) => comment.commentContent !== "삭제된 댓글입니다."
              ).length
            }
            개의 댓글
          </h5>
        </div>
        <Form.Check
          type="checkbox"
          label="익명"
          className="comment-anonymous-check"
          checked={anonymous}
          onChange={handleAnonymous}
          size="sm"
          style={{ width: "60px" }}
        />

        <div className="board-comment-write">
          <Form.Control
            className="comment-write-form"
            placeholder="댓글을 작성하세요"
            value={writeComment}
            onChange={(e) => setWriteComment(e.target.value)}
            onKeyUp={(e) => onKeyUp(e)}
          />
          <Button
            className="comment-write-btn"
            onClick={() => {
              handleCommentWrite();
            }}
          >
            작성
          </Button>
        </div>
        <div className="board-comment-view">
          {commentData.map((data) =>
            data.depth !== 0 ? (
              ""
            ) : (
              <div className="board-comment-each">
                <div className="board-comment-writer">
                  <strong>{data.isAnonymous ? "익명" : data.writer}</strong>

                  <div className="comment-btns">
                    <button
                      className="comment-btn-reply"
                      onClick={() => {
                        setReplyTo(replyTo === data._id ? null : data._id);
                        setReplyAnonymous(0);
                      }}
                    >
                      답글
                    </button>

                    <button
                      className="comment-btn-del"
                      onClick={() => {
                        handleCommentDelete(data._id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <div className="board-comment-date">
                  {timeAgo(data.commentUpdatedAt)}
                </div>
                <div className="board-comment-content">
                  {data.commentContent}
                </div>
                {replyTo === data._id && (
                  <>
                    <Form.Check
                      type="checkbox"
                      label="익명"
                      className="comment-anonymous-check comment-reply-anonymous-check"
                      checked={replyAnonymous}
                      onChange={handleReplyAnonymous}
                      size="sm"
                      style={{ width: "60px" }}
                    />
                    <div className="board-comment-write board-comment-reply-write">
                      <Form.Control
                        className="comment-write-form comment-reply-write-form"
                        placeholder="대댓글을 작성하세요"
                        value={writeCommentReply}
                        onChange={(e) => setWriteCommentReply(e.target.value)}
                        onKeyUp={(e) => onKeyUpReply(e, data._id)}
                      />
                      <Button
                        className="comment-write-btn comment-reply-write-btn"
                        onClick={() => {
                          handleCommentReplyWrite(data._id);
                        }}
                      >
                        작성
                      </Button>
                    </div>
                  </>
                )}
                <hr className="line" />
                {data.commentReplys.length <= 0
                  ? ""
                  : data.commentReplys.map((commentReply) => (
                      <div className="board-comment-each">
                        <div className="board-comment-writer">
                          <strong>
                            {commentReply.isAnonymous
                              ? "익명"
                              : commentReply.writer}
                          </strong>
                          <div className="comment-btns">
                            <button
                              className="comment-btn-del"
                              onClick={() => {
                                handleCommentReplyDelete(
                                  data._id,
                                  commentReply._id
                                );
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                        <div className="board-comment-date">
                          {timeAgo(commentReply.commentUpdatedAt)}
                        </div>
                        <div className="board-comment-content">
                          {commentReply.commentContent}
                        </div>
                        <hr></hr>
                      </div>
                    ))}
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
}