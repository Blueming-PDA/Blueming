import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Stack,
  Badge,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BoardApi from "~/lib/apis/board";

export default function BoardWritePage() {
  const navigate = useNavigate();
  const params = useParams();
  const boardId = params.boardId;

  const [newBoard, setNewBoard] = useState({
    boardType: "assignment",
    boardTitle: "",
    boardContent: "",
    boardFile: "",
    isAnonymous: 0,
    tag: [],
  });

  const { boardType, boardTitle, boardContent, boardFile, isAnonymous } =
    newBoard;

  const fetchBoardData = async (boardId) => {
    try {
      const boardData = await BoardApi.fetchBoardDetail(boardType, boardId);
      setNewBoard(boardData);
    } catch (err) {
      console.error("Error fetching board data:", err);
    }
  };

  const toggleAnoymous = () => {
    setNewBoard((prev) => ({
      ...prev,
      isAnonymous: prev.isAnonymous ? 0 : 1,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWriteBoard = async () => {
    try {
      if (boardTitle.trim() === "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (boardContent.trim() === "") {
        alert("내용을 입력해주세요.");
      } else if (selectedTags.length === 0) {
        alert("태그를 선택해주세요.");
        return;
      }
      if (!boardId) {
        // 과제 등록
        await BoardApi.fetchBoardWrite(boardType, newBoard);
      } else {
        // 과제 수정
        await BoardApi.fetchBoardEdit(boardType, boardId, newBoard);
      }
      navigate(-1);
    } catch (err) {
      console.error("Error posting board:", err);
    }
  };

  const tags = ["개인과제", "팀과제"];
  const [selectedTags, setSelectedTags] = useState([]);
  const handleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    // url에 boardId 있으면 board data 가져옴
    if (boardId) {
      fetchBoardData(boardType, boardId);
    }
  }, [boardId]);

  useEffect(() => {
    setNewBoard((prev) => ({
      ...prev,
      tag: selectedTags,
    }));
  }, [selectedTags]);

  return (
    <Container className="min-vh-100">
      <h1>{boardId ? "과제 수정" : "과제 등록"}</h1>
      <Form>
        <fieldset>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="writeForm.title.input"
          >
            <Form.Label column sm={1}>
              Title:
            </Form.Label>
            <Col sm={11}>
              <Form.Control
                type="text"
                name="boardTitle"
                value={boardTitle}
                placeholder="제목을 입력해주세요."
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <Stack direction="horizontal" gap={2}>
                <span>Tags:</span>
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    pill
                    bg={selectedTags.includes(tag) ? "primary" : "secondary"}
                    onClick={() => handleSelectTag(tag)}
                    style={{ cursor: "pointer" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </Stack>
            </div>
            <Form.Group controlId="formFile" className="mb-0">
              <Form.Control type="file" size="sm" style={{ width: "200px" }} />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="writeForm.content.input">
            <Form.Control
              as="textarea"
              rows={3}
              name="boardContent"
              value={boardContent}
              placeholder="내용을 입력해주세요."
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-end"
            id="formCheckbox"
          >
            <Form.Check
              type="checkbox"
              label="익명"
              checked={isAnonymous === 1}
              onChange={toggleAnoymous}
              size="sm"
              style={{ width: "60px" }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end mb-3">
            <Button
              onClick={(e) => {
                navigate(-1);
              }}
              className="me-2 custom-btn"
            >
              ◀◀️
            </Button>
            <Button
              type="button"
              onClick={handleWriteBoard}
              className="me-2 custom-btn"
            >
              {boardId ? "수정" : "등록"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
}
