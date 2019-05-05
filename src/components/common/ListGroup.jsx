import React from "react";
const ListGroup = ({
  items,
  selected,
  onGenreChange,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            selected === item ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onGenreChange(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
