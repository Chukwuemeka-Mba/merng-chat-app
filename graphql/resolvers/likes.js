const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          post.likes = post.likes.filter((like) => like.username !== username);
          await post.save();
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post does not exist");
      }
    },
  },
};
