import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders title and login icon", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const element = screen.getByText(/Hack Ideas/i);
  const icon = screen.getByTestId("login");
  expect(icon).toBeInTheDocument();
  expect(element).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});

test("should navigate to login page on click of login icon", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const icon = screen.getByTestId("login");
  fireEvent.click(icon);
  const element = screen.getByTestId("loginOverlay");
  expect(element).toBeInTheDocument();
});
