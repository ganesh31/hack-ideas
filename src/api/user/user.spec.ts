import { isUserExists } from "./user";

describe("user API", () => {
  it("should return the user", async () => {
    const user = await isUserExists("1");

    expect(user?.id).toEqual(1);
  });

  it("should return null if the user is not available", async () => {
    const user = await isUserExists("123");

    expect(user).toBeNull();
  });
});
