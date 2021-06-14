import { PostCard } from '../PostCard';
import "./styles.css";

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post, index) => (
      <PostCard
        key={index}
        post={post}
      />
    ))}
  </div>
)
