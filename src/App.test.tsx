import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders title and login icon", async () => {
  const { asFragment } = await render(
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

test("should navigate to login page on click of login icon", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await waitFor(() => {
    const icon = screen.getByTestId("login");
    expect(icon).toBeInTheDocument();
  });
  fireEvent.click(screen.getByTestId("login"));
  const element = screen.getByTestId("loginOverlay");
  expect(element).toBeInTheDocument();
});
