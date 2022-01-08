import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AutocompleteOption from "./AutocompleteOption";

export default {
  title: "Autocomplete/AutocompleteOption",
  component: AutocompleteOption,
  argTypes: {
    typedText: {
      description:
        "The typed text from the Autocomplete. Used to be highlighted.",
    },
    option: { description: "The autocomplete option to display" },
  },
} as ComponentMeta<typeof AutocompleteOption>;

const Template: ComponentStory<typeof AutocompleteOption> = (args) => (
  <AutocompleteOption {...args} />
);

export const Default = Template.bind({});
Default.args = {
  typedText: "highlight",
  option: {
    label: "Example with some highlight matching",
    value: 1,
  },
};
