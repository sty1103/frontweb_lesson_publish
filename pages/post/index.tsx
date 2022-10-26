import PostsContainer from "@/containers/posts/PostsContainer";
import { NextPage } from "next";

const PostList: NextPage = () => {
  return (
    <div style={{paddingTop:'100px'}}>
      <PostsContainer />
    </div>
  );
}

export default PostList;