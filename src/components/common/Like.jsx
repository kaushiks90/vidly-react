import React from "react";

const Like = props => {
  return (
    <div>
      <i
        onClick={props.onClick}
        className={props.liked ? "fa fa-heart-o" : "fa fa-heart"}
      />
    </div>
  );
};

export default Like;
