import React from "react";
import _ from "lodash";

const Pagination = props => {
  let { items, pageSize, currentPage, onPageChange } = props;
  const totalPages = Math.ceil(items / pageSize);
  const pages = _.range(1, totalPages + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
