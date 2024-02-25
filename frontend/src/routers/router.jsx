import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "~/components/MainLayout";

import MainPage from "~/routes/MainPage";
import LoginPage from "../routes/user/login/LoginPage";
import SignupPage from "~/routes/user/signup/SignupPage";
import MyPage from "~/routes/user/mypage/MyPage";

import AssignmentPage from "~/routes/board/assignment/AssignmentPage";
import AssignmentDetailPage from "~/routes/board/assignment/detail/AssignmentDetailPage";
import AssignmentWritePage from "~/routes/board/assignment/write/AssignmentWritePage";
import BoardPage from "~/routes/board/board/BoardPage";
import BoardDetailPage from "~/routes/board/board/detail/BoardDetailPage";
import BoardWritePage from "~/routes/board/board/write/BoardWritePage";
import NoticePage from "~/routes/board/notice/NoticePage";
import NoticeDetailPage from "~/routes/board/notice/detail/NoticeDetailPage";
import NoticeWritePage from "~/routes/board/notice/write/NoticeWritePage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <MainPage />,
      },
      {
        path: "/users",
        children: [
          {
            path: "login",
            element: <LoginPage></LoginPage>,
            index: true,
          },
          {
            path: "signup",
            element: <SignupPage></SignupPage>,
            index: true,
          },
          {
            path: "mypage",
            element: <MyPage></MyPage>,
            index: true,
          },
          {
            path: "signup",
            element: <SignupPage></SignupPage>,
            index: true,
          },
        ],
      },
      {
        path: "/assignment",
        children: [
          {
            path: "",
            index: true,
            element: <AssignmentPage></AssignmentPage>,
          },
          {
            path: "detail",
            index: true,
            element: <AssignmentDetailPage></AssignmentDetailPage>,
          },
          {
            path: "write",
            index: true,
            element: <AssignmentWritePage></AssignmentWritePage>,
          },
        ],
      },
      {
        path: "/board",
        children: [
          {
            path: "",
            index: true,
            element: <BoardPage></BoardPage>,
          },
          {
            path: "detail",
            index: true,
            element: <BoardDetailPage></BoardDetailPage>,
          },
          {
            path: "write",
            index: true,
            element: <BoardWritePage></BoardWritePage>,
          },
        ],
      },
      {
        path: "/notice",
        children: [
          {
            path: "",
            index: true,
            element: <NoticePage></NoticePage>,
          },
          {
            path: "detail",
            index: true,
            element: <NoticeDetailPage></NoticeDetailPage>,
          },
          {
            path: "write",
            index: true,
            element: <NoticeWritePage></NoticeWritePage>,
          },
        ],
      },
    ],
  },
]);
