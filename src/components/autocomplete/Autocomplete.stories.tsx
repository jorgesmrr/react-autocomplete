import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import faker from "faker";

import Autocomplete from "./Autocomplete";

export default {
  title: "Autocomplete/Autocomplete",
  component: Autocomplete,
  argTypes: {
    value: {
      description:
        "Equal to the `value` property of the selected option. It's `null` when no option is selected.",
    },
    onChange: {
      description:
        "Called when an option gets selected. Receives its `value` property value.",
    },
    typedValue: {
      description:
        "The input text value. When an option is selected, it will receive the `label` property of the option.",
    },
    onChangeTypedValue: {
      description: "Called when the input text value changes.",
    },
    options: {
      description:
        "Array of options to be filtered by the typed text. Each item should have the `label` and `value` properties.",
    },
    id: { description: "The input id." },
    label: { description: "The text for the input label." },
    tabIndex: { description: "The input tabindex." },
    placeholder: { description: "The input placeholder." },
    disabled: { description: "The input disabled attribute." },
    isLoading: { description: "Show a progress indicator when `true`." },
    emptyMessage: {
      description:
        "A message to be shown when no suggestions are available for the typed text.",
    },
    errorMessage: {
      description:
        "A message to show instead of the suggestions. Useful when the options failed to load.",
    },
    maxOptionsHeight: {
      description:
        "Limit how tall the suggestions list can be (CSS value). It will scroll on overflow.",
    },
  },
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = (args) => {
  const [text, setText] = useState("");

  return (
    <Autocomplete {...args} typedValue={text} onChangeTypedValue={setText} />
  );
};

faker.seed(42);

const options = [...new Array(5)].map((_, i) => ({
  value: i,
  label: faker.name.findName(),
}));

export const Default = Template.bind({});
Default.args = {
  options,
  placeholder: "Start typing...",
};

export const Empty = Template.bind({});
Empty.args = {
  options: [],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  errorMessage: "The error message will appear here",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  id: "autocomplete-with-label",
  label: "With label:",
};

const OutsideLabelTemplate: ComponentStory<typeof Autocomplete> = (args) => {
  const [text, setText] = useState("");

  return (
    <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
      <label htmlFor="autocomplete-with-out-label">Label here:</label>
      <Autocomplete {...args} typedValue={text} onChangeTypedValue={setText} />
    </div>
  );
};

export const WithOutsideLabel = OutsideLabelTemplate.bind({});
WithOutsideLabel.args = {
  ...Default.args,
  id: "autocomplete-with-out-label",
};
