function useTraverseTree() {
  function insertNode(tree, commentId, item) {
    let newComment = {
      author: "",
      commentId: crypto.randomUUID(),
      content: item,
      creatorHeart: false,
      cursorReplies: crypto.randomUUID() + "%3D%3D",
      pinned: null,
      status: false,
      text: null,
      publishedTimeText: new Date().getTime() + "ago",
      stats: {
        replies: null,
        votes: null,
      },
      comments: [],
    };

    // first level - user comment

    if (!commentId) {
      if (Array.isArray(tree)) {
        tree.unshift(newComment);
      } else {
        tree = [newComment];
      }
    }

    // nested comment
    if (tree.commentId === commentId) {
      tree?.comments?.unshift(newComment);
      return tree;
    }

    // search for parent comment
    let latestComment = [];
    latestComment = tree?.comments?.map((comment) => {
      return insertNode(comment, commentId, item);
    });

    return { ...tree, comments: latestComment };
  }

  //   function deleteNode() {}

  //   function updateNode() {}

  return { insertNode };
}

export default useTraverseTree;
