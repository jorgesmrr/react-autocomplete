import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Autocomplete from "./Autocomplete";

const options = [
  {
    label: "Dog",
    value: 1,
  },
  {
    label: "Cat",
    value: 2,
  },
  {
    label: "Mouse",
    value: 3,
  },
];

const WrapperComponent = () => {
  const [text, setText] = useState("");

  return (
    <Autocomplete
      typedValue={text}
      onChangeTypedValue={setText}
      options={options}
    />
  );
};

describe("Autocomplete", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<WrapperComponent />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should allow typing", async () => {
    const { getByRole } = render(<WrapperComponent />);

    const input = getByRole("textbox");

    const text = "Hey there!";
    userEvent.type(input, text);
    expect(input).toHaveValue(text);
  });

  it("should show items when the input is empty", async () => {
    const { getByRole, getAllByRole } = render(<WrapperComponent />);

    const input = getByRole("textbox");

    fireEvent.focus(input);
    expect(getAllByRole("listitem").length).toBe(options.length);
  });

  it("should select on pressing Enter", async () => {
    const { getByRole } = render(<WrapperComponent />);

    const input = getByRole("textbox");

    userEvent.type(input, "{enter}");
    expect(input).toHaveValue(options[0].label);
  });

  it("should correclty navigate with arrows", async () => {
    const { getByRole } = render(<WrapperComponent />);

    const input = getByRole("textbox");

    userEvent.type(input, "{arrowdown}{arrowdown}{arrowup}{enter}");
    expect(input).toHaveValue(options[1].label);
  });

  it("should hide suggestions on pressing Escape", async () => {
    const { getByRole, getAllByRole, queryByRole } = render(
      <WrapperComponent />
    );

    const input = getByRole("textbox");

    userEvent.type(input, "dog");
    expect(getAllByRole("listitem").length).toBeTruthy();

    userEvent.type(input, "{escape}");
    expect(queryByRole("listitem")).toBeNull();
  });
});
