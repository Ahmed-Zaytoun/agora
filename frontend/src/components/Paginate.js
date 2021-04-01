import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination className="justify-content-center mt-4">
        {[...Array(pages).keys()].map((pagearray) => (
          <LinkContainer
            key={pagearray + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${pagearray + 1}`
                  : `/page/${pagearray + 1}`
                : `/admin/productlist/${pagearray + 1}`
            }
          >
            <Pagination.Item active={pagearray + 1 === page}>
              {pagearray + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
