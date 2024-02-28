// 액션 타입
const SET_MESSAGE = "SET_MESSAGE";

// 액션 생성 함수
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  message,
});

// 리듀서
const initialState = {
  message: "",
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}
