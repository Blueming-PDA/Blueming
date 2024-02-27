import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CodeShare from "./codeShare/CodeShare";
import SetLink from "./codeShare/SetLink";
import Question from "./question/Question";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainPage() {
  const [codelink, setCodelink] = useState("");
  const [showCodeShare, setShowCodeShare] = useState(false);
  const [showLinkInput, setshowLinkInput] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const navigate = useNavigate();

  const userObj = useSelector((state) => {
    return state.user.userInfo;
  });

  useEffect(() => {
    console.log("hello");
    if (userObj === null) {
      alert("로그인이 필요합니다.");
      // 로그인 페이지로 이동
      navigate("/users/login");
    }
  }, [userObj, history]);

  const handleShowCodeShare = () => {
    if (!codelink) {
      alert("화면 공유 링크를 먼저 삽입해주세요");
      return;
    }
    setShowCodeShare((showCodeShare) => !showCodeShare);
  };
  const handleShowLinkInput = () => {
    setshowLinkInput((showLinkInput) => !showLinkInput);
  };
  const handleShowQuestion = () => {
    setShowQuestion((showQuestion) => !showQuestion);
  };

  console.log("code", codelink);

  return (
    <div>
      <div style={{ display: "flex", gap: 50 }}>
        {userObj && userObj.admin === 0 ? (
          <>
            <Button onClick={handleShowQuestion}>🙋‍♀️ 질문하기</Button>
            <Button onClick={handleShowLinkInput}>🖥️ 화면공유 하기</Button>
            <Button onClick={handleShowCodeShare}>🖥️ 화면공유 보기</Button>
          </>
        ) : (
          <>
            <Button>👀 질문보기</Button>
            <Button onClick={handleShowLinkInput}>🖥️ 화면공유 하기</Button>
            <Button onClick={handleShowCodeShare}>🖥️ 화면공유 보기</Button>
          </>
        )}
      </div>
      {showLinkInput && (
        <SetLink
          setCodelink={setCodelink}
          handleShowLinkInput={handleShowLinkInput}
        />
      )}
      {showQuestion && <Question handleShowQuestion={handleShowQuestion} />}
      {showCodeShare && <CodeShare link={codelink} />}
    </div>
  );
}
