import Comment from "./Comment";

function CommentList({ comments, deleteComment }) {
  return comments.map((comment) => (
    <Comment
      comment={comment}
      deleteComment={deleteComment}
      key={comment._id}
    />
  ));
}
export default CommentList;
