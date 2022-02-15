import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

const allTags = [
  {
    id: 1,
    name: "recursion",
  },
  {
    id: 2,
    name: "math fundamentals",
  },
  {
    id: 3,
    name: "data structures",
  },
  {
    id: 4,
    name: "advanced",
  },
  {
    id: 5,
    name: "binary search",
  },
  {
    id: 6,
    name: "intermediate",
  },
];

const hack = {
  title: "Circa May '22",
  description: "Test your coding skills",
  authorId: 1,
  question: "### Question3",
  tags: [4, 3],
  createdAt: 1644825217436,
  id: 5,
  likes: 1,
  likedBy: [123],
};

describe("Card", () => {
  it("should call onToggle when user clicks on like button", () => {
    const mockToggle = jest.fn();

    const { asFragment } = render(
      <Card allTags={allTags} hack={hack} onToggleLike={mockToggle} />
    );

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByTestId("button"));
    expect(mockToggle).toBeCalledTimes(1);
  });
});
