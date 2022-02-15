import { render, screen, waitFor } from "@testing-library/react";
import Hacks from "./Hacks";

describe("Hacks", () => {
  it("should show no hacks if there are no hacks", async () => {
    const { asFragment } = await render(<Hacks />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render all the hacks", async () => {
    const { asFragment } = render(<Hacks />);

    await waitFor(() => {
      expect(screen.getByText(/Jan Circuits '22/i)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
