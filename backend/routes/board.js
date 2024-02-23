const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Comment = require("../models/Comment");

//user관리 된 후 authenticate 추가 필요

//모든 게시글 조회하기

router.get("/", (req, res, next) => {
  Board.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//게시글 작성하기
router.post("/", (req, res, next) => {
  userId: req.user._id;
  Board.create({ ...req.body })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

//게시글 삭제하기
router.delete("/:boardId", function (req, res, next) {
  Board.findByIdAndDelete(req.params.boardId)
    .then(() => {
      //res.json(data);
      res.json({ message: "삭제 완료" });
    })
    .catch((err) => {
      next(err);
    });
});

//게시글 조회하기
router.get("/:boardId", function (req, res, next) {
  Board.findById(req.params.boardId)
    .then((board) => {
      res.json(board);
    })
    .catch((err) => {
      next(err);
    });
});

//게시글 댓글 조회하기
router.get("/:boardId/comment", async function (req, res, next) {
  try {
    const comments = await Comment.find({
      boardId: req.params.boardId,
    }).populate("commentReplys");

    res.json({ comments });
  } catch (err) {
    next(err);
  }
});

//게시글과 댓글 조회하기
router.get("/:boardId/boardAndComment", async function (req, res, next) {
  try {
    const boards = await Board.findById(req.params.boardId);
    const comments = await Comment.find({
      boardId: req.params.boardId,
    }).populate("commentReplys");

    res.json({ boards, comments });
  } catch (err) {
    next(err);
  }
});

//게시글 댓글 달기
router.post("/:boardId/comment", (req, res, next) => {
  const { boardId } = req.params;
  //console.log(req.body);

  Comment.create({
    ...req.body,
    boardId: boardId,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

//게시글 댓글 삭제하기
router.delete("/:boardId/comment/:commentId", function (req, res, next) {
  const { commentId } = req.params;

  Comment.deleteOne({
    _id: commentId,
  })
    .then(() => {
      res.json({ message: "삭제 완료" });
    })
    .catch((err) => {
      next(err);
    });
});

//게시글 대댓글 달기
router.post("/:boardId/comment/:commentId", function (req, res, next) {
  const { boardId, commentId } = req.params;
  let createdCommentId; // 추가된 댓글의 ID를 저장하기 위한 변수

  Comment.create({
    ...req.body,
    boardId: boardId,
    commentReplys: [],
  })
    .then((data) => {
      createdCommentId = data._id; // 추가된 댓글의 ID 저장
      return Comment.findByIdAndUpdate(
        commentId,
        { $push: { commentReplys: createdCommentId } },
        { new: true }
      );
    })
    .then((data2) => {
      return res.json(data2);
    })

    .catch((err) => {
      next(err);
    });
});

//게시글 대댓글 삭제하기
router.delete(
  "/:boardId/comment/:commentId/commentReply/:commentReplyId",
  async (req, res, next) => {
    const { commentId, commentReplyId } = req.params;

    try {
      await Comment.deleteOne({ _id: commentReplyId });

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { commentReplys: commentReplyId } },
        { new: true }
      );

      if (!updatedComment) {
        return res
          .status(404)
          .json({ message: "댓글이나 댓글 답글을 찾을 수 없습니다." });
      }

      // 제거된 commentReplyId를 응답으로 전송
      res.json({ message: "삭제 완료", updatedComment });
    } catch (error) {
      // 오류 발생 시 다음 미들웨어로 전달
      next(error);
    }
  }
);

module.exports = router;
