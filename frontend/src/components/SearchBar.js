import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} inline className="ml-0">
        <InputGroup className="m-auto">
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="mt-0 ml-0"
          ></Form.Control>
          <InputGroup.Append>
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchBar;
