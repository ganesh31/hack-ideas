import { render, screen, waitFor } from "@testing-library/react";
import Hacks from "./Hacks";

describe("Hacks", () => {
  it("should render all the hacks", async () => {
    const { asFragment } = render(<Hacks />);

    await waitFor(() => {
      expect(screen.getByText(/Jan Circuits '22/i)).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
