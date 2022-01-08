import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MoviesAutocomplete from "./MoviesAutocomplete";

export default {
  title: "Autocomplete/MoviesAutocomplete",
  component: MoviesAutocomplete,
} as ComponentMeta<typeof MoviesAutocomplete>;

const Template: ComponentStory<typeof MoviesAutocomplete> = (args) => (
  <MoviesAutocomplete />
);

export const Default = Template.bind({});
