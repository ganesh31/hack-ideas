import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Hacks from "./Hacks";

describe("Hacks", () => {
  it("should render all the hacks", async () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("button-like").length).not.toEqual(0);
    });
  });

  it("should not show the add hack button if the user is not logged in", () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    expect(screen.queryByTestId("addHack")).not.toBeInTheDocument();
  });

  it("should show the add hack button if the user is logged in", () => {
    render(
      <BrowserRouter>
        <Hacks user={{ id: 1, name: "John", hacks: [] }} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("addHack")).toBeInTheDocument();
  });

  it("should navigate to login page if user is not logged in and clicks on the like button", async () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("button-like").length).not.toEqual(0);
    });

    fireEvent.click(screen.getAllByTestId("button-like")[0]);
  });

  it("should update likes hack on click of the like button", async () => {
    render(
      <BrowserRouter>
        <Hacks
          user={{
            id: 1,
            name: "John",
            hacks: [],
          }}
        />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("button-like").length).not.toEqual(0);
    });

    const likesElement = screen.queryAllByTestId("likes-count");
    let likesCount =
      parseInt(likesElement?.length > 0 ? likesElement[0].innerHTML : "") || 0;
    fireEvent.click(screen.getAllByTestId("button-like")[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("likes-count")[0]).toHaveTextContent(
        (likesCount - 1).toString()
      );
    });

    fireEvent.click(screen.getAllByTestId("button-like")[0]);

    await waitFor(() => {
      expect(screen.queryAllByTestId("likes-count")[0]).toHaveTextContent(
        likesCount.toString()
      );
    });
  });

  it("should filter hacks based on search text", async () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("button-like").length).not.toEqual(0);
    });

    fireEvent.change(screen.getByPlaceholderText("Search By Title"), {
      target: { value: "jan" },
    });

    expect(screen.getAllByTestId("button-like").length).toEqual(1);

    fireEvent.change(screen.getByPlaceholderText("Search By Title"), {
      target: { value: "jack" },
    });

    expect(screen.queryByTestId("button-like")).toBeNull();
  });

  it("should filter hacks based on tag select", async () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("button-like").length).not.toEqual(0);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("tag").length).not.toEqual(0);
    });

    const element = screen.getAllByTestId("tag");
    // Before filter
    expect(screen.getAllByTestId("button-like").length).toEqual(2);

    fireEvent.click(element[0]);

    // after filter
    expect(screen.getAllByTestId("button-like").length).toEqual(1);
  });

  it("should sort by likes and created date", async () => {
    render(
      <BrowserRouter>
        <Hacks user={null} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("button-like").length).not.toEqual(0);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("tag").length).not.toEqual(0);
    });

    fireEvent.click(screen.getByText("Created At"));
    fireEvent.click(screen.getByText("Most Liked"));
  });
});
