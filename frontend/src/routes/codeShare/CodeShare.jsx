import React, { useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";


export default function CodeShare() {
    const [url, setUrl] = useState('');
    const [link, setLink] = useState(null);
    const [popupWindow, setPopupWindow] = useState(null);  // 팝업 창에 대한 참조를 저장
    const [loading, setLoading] = useState(true);

    let userObj = useSelector((state) => {
        return state.user.userInfo;
    });
    useEffect(() => {
        const getActiveLink = async () => {
            try {
                const response = await axios.get('/api/link/activate/');
                setLink(response.data);
            } catch (error) {
                console.error("Error fetching active link: ", error);
            }
        }
        getActiveLink();
    }, []);

    useEffect(() => {
        if (!link) return;

        const getContent = async () => {
            setLoading(true);  // 로딩 시작
            try {
                const response = await axios.get(`/api/proxy/${encodeURIComponent(link.codeLink)}`);
                setUrl(response.data);
                console.log("URL:::", response)
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);  // 로딩 완료
            }
        }
        getContent();
    }, [link]);

    const newWindow = () => {
        const width = 600;
        const height = 400;
        const left = window.screen.width - width;
        const top = window.screen.height - height;
        const newPopupWindow = window.open(link.codeLink, '_blank', `toolbar=yes,scrollbars=yes,resizable=yes,top=${top},left=${left},width=${width},height=${height}`);
        setPopupWindow(newPopupWindow);
    }

    // 공유 중지하기 버튼을 클릭했을 때의 처리
    const stopSharing = async () => {
        try {
            // 서버에 activate를 false로 바꾸는 요청을 보냅니다.
            await axios.put(`/api/link/${link}`, { activate: false });
            setLink(null);  // 링크를 초기화합니다.
            setUrl('');  // URL을 초기화합니다.
            if (popupWindow) popupWindow.close();  // 팝업 창이 열려있다면 닫습니다.
        } catch (error) {
            console.error("Error stopping sharing: ", error);
        }
    }

    return (
        <>
            <Container style={{ width: '800px', backgroundColor: '#ebf1ff', borderRadius: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', position: 'relative', marginTop: 50, marginBottom: 50, bottom: '-20px', padding: 30 }}>
                {loading ? (
                    // 로딩 중일 때는 스피너를 보여줍니다.
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : link ? (
                    <>
                        <div>⌨️ 코드 화면 공유

                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
                            <Button onClick={newWindow}>🖥️ 새창으로 보기</Button>

                            {userObj._id === link.userId ?

                                <Button onClick={stopSharing}>공유 중지하기</Button> : <></>
                            }

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ width: '100%', height: '500px', position: 'relative' }}>
                                <iframe
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    srcDoc={url}
                                    sandbox='allow-scripts allow-same-origin'
                                    title='codeShare'
                                />
                            </div>
                        </div>
                    </>)
                    : <div>화면을 공유할 수 있는 유효한 링크가 없습니다</div>}
            </Container>
        </>
    )
}
