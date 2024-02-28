import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../socket/socket';
import { useSelector } from 'react-redux';

const Alarm = () => {

    let userObj = useSelector((state) => {
        return state.user.userInfo;
    });

    useEffect(() => {
        // 관리자만 알림 표시
        if (userObj && userObj.admin === 1) {
            socket.on('message', (alarmContent) => {
                // 알림 내용을 가져와서 토스트로 표시
                console.log(alarmContent);
                const message = `${alarmContent.alarmTitle}\n질문 학생 :: ${alarmContent.userName}\n${alarmContent.alarmCreatedAt}`;
                toast(message, {
                    bodyClassName: "grow-font-size",
                });
            });
        }

        // 컴포넌트가 언마운트될 때에는 리스너를 제거
        return () => {
          socket.off('message');
        };
    }, [userObj]);

    return (
        <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default Alarm;
