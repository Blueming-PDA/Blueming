import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CodeShare from "./codeShare/CodeShare";
import SetLink from "./codeShare/SetLink";
import Question from "./question/Question";
import AlarmList from "./question/AlarmList";
import "bootstrap/dist/css/bootstrap.min.css";
import point from "/point.png";
import "./MainPage.css";
import socket from "./socket/socket";
import { setSid } from "./socket/socketEvents";

export default function MainPage() {
  const [showCodeShare, setShowCodeShare] = useState(false);
  const [showLinkInput, setshowLinkInput] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showAlarmList, setShowAlarmList] = useState(false);

  let userObj = useSelector((state) => {
    return state.user.userInfo;
  });


  useEffect(() => {
    if (userObj) {
      setSid(userObj);
    }
  }, []);


  const handleShowCodeShare = () => {
    setShowCodeShare((showCodeShare) => !showCodeShare);
  };

  // 링크 공유 하기 버튼
  const handleShowLinkInput = () => {
    setshowLinkInput((showLinkInput) => !showLinkInput);
  };

  // 질문 보기 버튼
  const handleShowQuestion = () => {
    setShowQuestion((showQuestion) => !showQuestion);
  };

  // 질문 보기 버튼
  const handleShowAlarmList = () => {
    setShowAlarmList((showAlarmList) => !showAlarmList);
  };

  // 정보
  const CLASS = "프로 디지털 아카데미";

  // socket 연결 확인
  useEffect(() => {
    console.log(socket);

    // socket.on('connection', (io) => {
    //   console.log('SocketID::', io.id);

    // })
  });


  return (
    <div className="main-container">

      {userObj &&
        <div className="btn-group">

          {userObj.admin === 1 ?

            <Button className="main-btn" onClick={handleShowAlarmList}>
              👀 질문보기
            </Button>
            :

            <Button className="main-btn " onClick={handleShowQuestion}>
              🙋 질문하기
            </Button>
          }
          <Button className="main-btn" onClick={handleShowLinkInput}>
            🔗 화면공유하기
          </Button>
          <Button className="main-btn" onClick={handleShowCodeShare}>
            🖥️ 화면공유 보기
          </Button>
        </div>
      }
      {showCodeShare && <CodeShare />}
      {showQuestion && <Question handleShowQuestion={handleShowQuestion} />}
      {showAlarmList && <AlarmList handleShowAlarmList={handleShowAlarmList} />}
      {showLinkInput && <SetLink handleShowLinkInput={handleShowLinkInput} />}


      <img className="point-img" src={point} width="75" alt="Blueming point" />
      <div className="week-board">
        {/* TODO */}
        <p>나의 수업: {CLASS}</p>
        <div className="week-card-container">
          <Card className="custom-card c1">
            <div className="circle"></div>
            <p className="week-text">MON</p>
            <p className="week-num">2/26</p>
            <p className="week-curriculum">
              클라우드 기반 프론트엔드 개발(React) 프로그래밍
            </p>
          </Card>
          <Card className="custom-card c2">
            <div className="circle"></div>
            <p className="week-text">TUE</p>
            <p className="week-num">2/27</p>
            <p className="week-curriculum">
              클라우드 기반 프론트엔드 개발(React) 프로그래밍
            </p>
          </Card>
          <Card className="custom-card c3">
            <div className="circle"></div>
            <p className="week-text">WED</p>
            <p className="week-num">2/28</p>
            <p className="week-curriculum">
              클라우드 기반 프론트엔드 개발(React) 프로그래밍
            </p>
          </Card>
          <Card className="custom-card c4">
            <div className="circle"></div>
            <p className="week-text">THU</p>
            <p className="week-num">2/29</p>
            <p className="week-curriculum">
              클라우드 기반 프론트엔드 개발(React) 프로그래밍
            </p>
          </Card>
          <Card className="custom-card c5">
            <div className="circle"></div>
            <p className="week-text">FRI</p>
            <p className="week-num red">3/1</p>
            <p className="week-curriculum">
              클라우드 기반 프론트엔드 개발(React) 프로그래밍
            </p>
          </Card>
        </div>
      </div>


    </div>
  );
}
