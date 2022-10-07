import { render, screen } from "@testing-library/react";

import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("should be in the document", () => {
    render(
      <ActiveLink href="/" activeClassLink="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should be receiving active class on link is active", () => {
    render(
      <ActiveLink href="/" activeClassLink="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});
