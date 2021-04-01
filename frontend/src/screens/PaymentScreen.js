import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cardActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <h1>shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Cash On Delivery"
              id="Cash on Delivery"
              name="CashMethod"
              value="Cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          {/* <Col>
              <Form.Check
                type="radio"
                label="Strip"
                id="Strip"
                name="stripMethod"
                value="Strip"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col> */}
        </Form.Group>

        <Button type="submit" variant="primary">
          {" "}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
