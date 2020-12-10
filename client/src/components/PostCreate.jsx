import React from "react";

const PostCreate = () => {
  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
