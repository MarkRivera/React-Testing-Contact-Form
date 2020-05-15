import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders App without crashing", () => {
  render(<App />);
});


test("Assure that all inputs are visible in document", async () => {
  const { findByLabelText } = render(<App />);

  // First Name Check
  const nameInput = await findByLabelText(/First Name/i);
  expect(nameInput).toBeInTheDocument();
  expect(nameInput).toBeVisible();

  // Last Name Check
  const lastNameInput = await findByLabelText(/Last Name/i);
  expect(lastNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeVisible();

  // Email Check
  const emailInput = await findByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toBeVisible();

  // Message Box Check
  const msgInput = await findByLabelText(/Message/i);
  expect(msgInput).toBeInTheDocument();
  expect(msgInput).toBeVisible();

});