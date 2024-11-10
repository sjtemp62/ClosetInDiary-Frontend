import { Scrollbar } from ".";

export default {
  title: "Components/Scrollbar",
  component: Scrollbar,
  argTypes: {
    OS: {
      options: ["mac", "windows"],
      control: { type: "select" },
    },
    position: {
      options: ["middle", "end", "start", "free"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    OS: "mac",
    horizontal: true,
    position: "middle",
    className: {},
    directionDownVariantPixelisedStyleOverrideClassName: {},
    directionDownVariantPixelisedStyleOverrideClassNameOverride: {},
  },
};
