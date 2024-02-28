import React, { useEffect, useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';


export default function AlarmList({ handleShowAlarmList }) {
    const [alarms, setAlarms] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                let { data } = await axios.get('/api/alarms');
                data = data.sort((a, b) => new Date(b.alarmCreatedAt) - new Date(a.alarmCreatedAt));  // 최신순으로 정렬
                setAlarms(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAlarms();
    }, []);

    const handleConfirm = async (id) => {
        try {
            await axios.put(`/api/alarms/${id}`, { confirmed: true });
            setAlarms(alarms.filter(alarm => alarm._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredAlarms = showAll ? alarms : alarms.filter(alarm => !alarm.confirmed);

    return (
        <Modal show={true} onHide={handleShowAlarmList} style={{ width: '500px' }}>
            <Modal.Header closeButton>
                <Modal.Title>알림 보기</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '300px', overflow: 'auto' }}>
                <Button onClick={() => setShowAll(false)}>확인 안한 알림만 보기</Button>
                <Button onClick={() => setShowAll(true)}>전체 보기</Button>
                {filteredAlarms.map(alarm =>
                    <Alert key={alarm._id} style={{ backgroundColor: '#ebf1ff' }} onClose={() => handleConfirm(alarm._id)} dismissible>
                        <p>제목: {alarm.alarmTitle}</p>
                        <p>작성일: {new Date(alarm.alarmCreatedAt).toLocaleString()}</p>
                        <p>학생: {alarm.userName}</p>
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
}
