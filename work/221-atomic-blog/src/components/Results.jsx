import { useContext } from "react";
import { PostContext } from "../App";

export default function Results() {
  const { posts } = useContext(PostContext);

  return <p>🚀 {posts.length} atomic posts found</p>;
}
