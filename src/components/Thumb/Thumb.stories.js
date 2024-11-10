import { Thumb } from ".";

export default {
  title: "Components/Thumb",
  component: Thumb,
  argTypes: {
    OS: {
      options: ["mac", "windows"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    horizontal: true,
    OS: "mac",
    hidden: true,
    className: {},
    vSpacerClassName: {},
    text: ".. ....................",
  },
};
