import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Fetch, { FetchRenderInfo } from "./Fetch";
import Movie from "../../models/Movie";

export default {
  title: "Helpers/Fetch",
  component: Fetch,
  argTypes: {
    url: { description: "The URL to be fetched." },
    responseTransformer: {
      description:
        "An optional function to process the data before it gets passed to the `render` function.",
    },
    render: {
      description:
        "Called with the data needed to display the content. Pass an object with 3 properties: `data` (`object` - the request response); `isLoading` (`boolean`); `hasFailed` (`boolean`)",
    },
    debounceWaitInterval: {
      description:
        "How long the component will wait after the last change to perform a request again (in ms).",
    },
  },
} as ComponentMeta<typeof Fetch>;

const Template: ComponentStory<typeof Fetch> = () => {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=46adf19d446a9d45cb333774af099e25&query=star-wars";

  const renderContent = ({ isLoading, hasFailed, data }: FetchRenderInfo) => {
    if (hasFailed) return <p>Failed</p>;

    return isLoading ? (
      <p>Please wait...</p>
    ) : (
      <ul>
        {data.results.map((movie: Movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    );
  };

  return <Fetch url={url} render={renderContent} />;
};

export const MoviesExample = Template.bind({});
