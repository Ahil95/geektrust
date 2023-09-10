import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = (props) => {
  return (
    <div className="pagination-container">
      <button
        onClick={props?.handleJumpToFirst}
        className={props?.currentPage === 0 ? "disabledbutton" : "activebutton"}
      >
        {" "}
        &#x21e4;{" "}
      </button>
      <ReactPaginate
        pageCount={Math.ceil(props?.users?.length / 10)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={props?.handlePageChange}
        containerClassName="pagination"
        previousLabel="<"
        previousClassName={props?.currentPage === 0 ? "disableda" : ""}
        nextClassName={
          props?.currentPage === Math.ceil(props?.users?.length / 10) - 1
            ? "disableda"
            : ""
        }
        nextLabel=">"
        breakLabel="..."
        activeClassName="active"
        forcePage={props?.currentPage}
        // initialPage={0}
      />
      <button
        onClick={props?.handleJumpToLast}
        className={
          props?.currentPage === Math.ceil(props?.users?.length / 10) - 1
            ? "disabledbutton"
            : "activebutton"
        }
      >
        &#x21e5;
      </button>
    </div>
  );
};

export default Pagination;
