import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, adminUpdateUser } from "../actions/userActions";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { USER_ADMIN_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
  const _id = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBlackListed, setIsBlackListed] = useState(false);

  console.log(isBlackListed);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userAdminUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });

      history.push("/admin/userlist");
    } else {
      //if it does not exists or not the requisted on
      if (user._id !== _id) {
        dispatch(getUserDetails(_id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsBlackListed(user.isBlackListed);
      }
    }
  }, [user, _id, dispatch, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      adminUpdateUser({
        _id,
        name,
        email,
        isAdmin,
        isBlackListed,
      })
    );
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin ?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="isBlackListed">
              <Form.Check
                type="checkbox"
                label="Do you want to black list this user"
                checked={isBlackListed}
                onChange={(e) => setIsBlackListed(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" className="btn btn-success">
              UPDATE
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
