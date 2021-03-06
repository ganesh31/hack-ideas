import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders title and login icon", async () => {
  const { asFragment } = await render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(screen.getByTestId("tag-0")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByText("Sorry no hacks are currently available.")
    ).not.toBeInTheDocument();
  });

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
    expect(screen.getByTestId("tag-0")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByText("Sorry no hacks are currently available.")
    ).not.toBeInTheDocument();
  });

  const icon = screen.getByTestId("login");
  expect(icon).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("login"));
  const element = screen.getByTestId("loginOverlay");
  expect(element).toBeInTheDocument();
});

test("should be able to login/logout", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const icon = screen.getByTestId("login");
  expect(icon).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("login"));
  const element = screen.getByTestId("loginOverlay");
  expect(element).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Employee Id"), {
    target: { value: 1 },
  });

  fireEvent.click(screen.getByText("Submit"));

  await waitFor(() => {
    expect(screen.getByText("Welcome John")).toBeInTheDocument();
  });

  expect(screen.getByTestId("logout")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("logout"));

  expect(screen.getByTestId("login")).toBeInTheDocument();
});
