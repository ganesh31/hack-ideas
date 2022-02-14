import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title and login icon", () => {
  const { asFragment } = render(<App />);
  const element = screen.getByText(/Hack Ideas/i);
  const icon = screen.getByTestId("login");
  expect(icon).toBeInTheDocument();
  expect(element).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});
