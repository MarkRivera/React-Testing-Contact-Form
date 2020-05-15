import React from "react";
import { render, fireEvent, waitFor, findByTestId } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});


test("Assure that all inputs are visible in document", async () => {
  const { findByLabelText, getByText, getByTestId } = render(<App />);

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

  // Submit Check
  const submitBtn = getByText(/Submit/i);
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeVisible();
});


test("Fill form and submit", async () => {
  const { getByLabelText, getByText, screen, getByTestId } = render(<App />);

  const userInfo = {
    firstName: "Ann",
    lastName: "Perkins",
    email: "APerkins2020@gmail.com",
    message: "Can someone find Andy?"
  }


  // First Name Check
  const nameInput = getByLabelText(/First Name/i);
  nameInput.value = userInfo.firstName;
  expect(nameInput.value.length).toBeLessThan(4);
  expect(nameInput.value).toMatch(/Ann/i);

  // Last Name Check
  const lastNameInput = getByLabelText(/Last Name/i);
  lastNameInput.value = userInfo.lastName;
  expect(lastNameInput.value).toMatch(/Perkins/i);
  expect(lastNameInput.value.length).toBeGreaterThan(0);

  // Email Check
  const emailInput = getByLabelText(/Email/i);
  emailInput.value = userInfo.email;
  expect(emailInput.value).toMatch(/APerkins2020@gmail.com/i);
  expect(emailInput.value.length).toBeGreaterThan(0);

  // Message Check
  const msgInput = getByLabelText(/Message/i);
  msgInput.value = userInfo.message;
  expect(msgInput.value).toMatch(/Can someone find Andy\?/i);
  expect(msgInput.value.length).toBeGreaterThanOrEqual(0);

  // Submit Form
  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  // Check if data is displayed after submit:

  let dataDisplayElement = await waitFor(() => {
    return getByTestId(/data/i)
  })

 expect(JSON.parse(dataDisplayElement.textContent))
  .toMatchObject(userInfo);
});
