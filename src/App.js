import React, { useState, useEffect } from 'react';

const App = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Load comments from local storage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to local storage whenever comments state changes
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleInput = (event) => {
    setComment(event.target.value);
  };

  const CommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, { text: comment, replies: [] }]);
      setComment('');
    }
  };

  const handleEditComment = (commentIndex) => {
    const editedComment = prompt('Edit comment:', comments[commentIndex].text);
    if (editedComment !== null) {
      const updatedComments = [...comments];
      updatedComments[commentIndex].text = editedComment;
      setComments(updatedComments);
    }
  };

  const handleReplyComment = (commentIndex) => {
    const reply = prompt('Reply to comment:');
    if (reply !== null) {
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.push(reply);
      setComments(updatedComments);
    }
  };

  return (
    <div>
      <h2>Comment Box</h2>
      <textarea
        placeholder="Write your comment..."
        value={comment}
        onChange={handleInput}
      />
      <button onClick={CommentSubmit}>Submit</button>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.text}</p>
          <button onClick={() => handleEditComment(index)}>Edit</button>
          <button onClick={() => handleReplyComment(index)}>Reply</button>
          {comment.replies.map((reply, replyIndex) => (
            <div key={replyIndex} style={{ marginLeft: '20px' }}>
              <p>{reply}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
