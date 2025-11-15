import { useState } from 'react'

const Post = ({ 
  post, 
  currentUser, 
  onAddComment, 
  onDeletePost, 
  onUpdatePost, 
  onDeleteComment, 
  onUpdateComment,
  onEditPost
}) => {
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [commentEditText, setCommentEditText] = useState('')
  const comments = post.comments || []

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    onAddComment(post.id, commentText)
    setCommentText('')
  }

  const handleCommentUpdate = (commentId) => {
    onUpdateComment(post.id, commentId, commentEditText)
    setEditingCommentId(null)
    setCommentEditText('')
  }

  return (
    <div className="note-card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      {/* Author + Post actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <small>By: {post.authorName || post.author || 'Unknown'}</small>
        {currentUser && (currentUser.id === post.userId || currentUser.name === post.author) && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => onEditPost(post)}>Edit</span>
            <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeletePost(post.id)}>Delete</span>
          </div>
        )}
      </div>

      {/* Comments */}
      <div className="comments-section">
        <h4 style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setShowComments(prev => !prev)}>
          Comments ({comments.length})
        </h4>

        {showComments && (
          <>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map(c => (
                <div key={c.id} className="comment" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {editingCommentId === c.id ? (
                    <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                      <input value={commentEditText} onChange={(e) => setCommentEditText(e.target.value)} />
                      <button className="btn btn-primary btn-sm" onClick={() => handleCommentUpdate(c.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span><strong>{c.authorName || c.author}</strong>: {c.text}</span>
                      {currentUser && (currentUser.id === c.userId || currentUser.name === c.author) && (
                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                          <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => { setEditingCommentId(c.id); setCommentEditText(c.text) }}>Edit</span>
                          <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDeleteComment(post.id, c.id)}>Delete</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}

            {currentUser && (
              <form onSubmit={handleCommentSubmit} className="comment-form" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} style={{ flex: 1 }} />
                <button type="submit" className="btn btn-primary btn-sm">Comment</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Post
