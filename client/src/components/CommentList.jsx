import React /*, { useState, useEffect } */ from "react";
// import axios from "axios";

export default ({ comments /* postId */ }) => {
  /*
    Code below made requests to comments events, making 
    application have requests to posts and comments.
    Adding a query event made it where this client does
    NOT have to make a request to comments also, just 
    posts.

    const [comments, setComments] = useState([]);

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
  
      setComments(res.data);
    };

    useEffect(() => {
      fetchData();
    }, []);

  */

  const renderedComments = comments.map((comment) => {
    let content;

    if (comment.status === "approved") {
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }

    if (comment.status === "rejected") {
      content = "This comment had been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
