import { render } from "@testing-library/react";
import Hacks from "./Hacks";

describe("Hacks", () => {
  it("should render all the hacks", async () => {
    const { asFragment } = await render(<Hacks />);

    expect(asFragment()).toMatchSnapshot();
  });
});
