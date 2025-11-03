import Post from './Post.jsx'

const PostList = ({ posts, currentUser, onAddComment, onDeletePost }) => {
  return (
    <div>
      <h2>Recent Posts</h2>
      <div className="notes-grid">
        {posts.length === 0 ? (
          <div className="note-card">
            <p>No posts yet. Be the first to create one!</p>
          </div>
        ) : (
          posts.map(post => (
            <Post
              key={post.id}
              post={post}
              currentUser={currentUser}
              onAddComment={onAddComment}
              onDeletePost={onDeletePost}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PostList