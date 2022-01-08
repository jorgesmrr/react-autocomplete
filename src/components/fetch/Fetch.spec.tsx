import { render } from "@testing-library/react";
import Fetch from "./Fetch";

const mockedResponse = "some text as response";

describe("Fetch", () => {
  it("should display the fetched data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockedResponse),
        })
      ) as jest.Mock
    );

    const { findByText } = render(
      <Fetch
        url="some-url"
        debounceWaitInterval={0}
        render={({ data }) => <div>{data}</div>}
      />
    );

    expect(await findByText(mockedResponse)).toBeInTheDocument();

    (global.fetch as jest.Mock).mockClear();
  });
});
