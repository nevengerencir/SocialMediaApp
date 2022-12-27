function Comment({ comment, img, name }) {
  return (
    <div className="flex justify-between max-w-4xl mt-4 shadow-lg p-2">
      <div className="flex ">
        <img src={img} className="h-20 rounded-full mr-4" />
        <h3 className="text-xl">{name}</h3>
      </div>
      <dir>
        <p>{comment.text}</p>
      </dir>
    </div>
  );
}
export default Comment;
