
import React, { useCallback, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { emitMessage } from '../socket/socketEvents';

export default function Question({ handleShowQuestion }) {
    const [question, setQuestion] = useState('');
    const [showQuestionInput, setShowQuestionInput] = useState(false);

    const handleShowQuestionInput = () => {
        setShowQuestionInput(showQuestionInput => !showQuestionInput);
    }

    const onSubmit = useCallback((question) => {
        // alert(`question : ${question} 을 백엔드로 요청보냅니다!`);
        emitMessage(question);
        handleShowQuestion()
    }, [handleShowQuestion]);


    return (
        <>
            <Modal show={true} onHide={handleShowQuestion}>
                <Modal.Header closeButton>
                    <Modal.Title>질문하기</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(question);
                }}>
                    <Modal.Body>

                        <Button onClick={() => {
                            const questionText = "코드를 다시 보여주세요";
                            setQuestion(questionText);
                            onSubmit(questionText);
                        }}>⌨️ 코드를 다시 보여주세요</Button>

                        <Button onClick={() => {
                            const questionText = "너무 빨라요";
                            setQuestion(questionText);
                            onSubmit(questionText);
                        }}>😥 너무 빨라요</Button>

                        <Button onClick={handleShowQuestionInput} >✏️ 질문을 입력할게요</Button>

                        {showQuestionInput && <Form.Group >

                            <Form.Label>✏️ 질문을 입력해주세요.</Form.Label>
                            <Form.Control as='textarea' rows={5} placeholder='질문을 입력하세요' value={question} onChange={(e) => setQuestion(e.target.value)} />

                            <Button type='submit'>✔️ 입력</Button>
                        </Form.Group>}

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={handleShowQuestion} >취소</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </>
    )

}
