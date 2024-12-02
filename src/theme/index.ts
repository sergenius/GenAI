import { createTheme, defaultDarkModeOverride } from "@aws-amplify/ui-react";
import { navLinkTheme } from "../components/Header";

export const theme = createTheme({
  name: "my-theme",
  components: [navLinkTheme],
  overrides: [defaultDarkModeOverride],
});
