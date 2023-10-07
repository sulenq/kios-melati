import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  colors: {
    p: {
      50: "#f1f8ff",
      100: "#D5F6FE",
      200: "#81D6FB",
      300: "#81D6FB",
      400: "#61C1F7",
      500: "#2FA1F2",
      600: "#227DD0",
      700: "#175EAE",
      800: "#0E428C",
      900: "#092F74",
    },
    ap: {
      50: "#2fa1f2",
      100: "#2fa1f2",
      200: "#2fa1f2",
      300: "#2fa1f2",
      400: "#2fa1f2",
      500: "#2fa1f2",
      600: "#2fa1f2",
      700: "#2fa1f2",
      800: "#2fa1f2",
      900: "#2fa1f2",
    },
    bnw: {
      200: "white",
      300: "white",
      500: "#000000",
      600: "#000000",
    },
    wnb: {
      200: "#000000",
      300: "#000000",
      500: "white",
      600: "white",
    },
    b: "#000000",
    bt: "#333333",
    w: "white",
    wt: "#eee",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#000000" : "white",
        color: props.colorMode === "dark" ? "wt" : "bt",
      },
    }),
  },

  components: {
    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: "transparent",
          color: props.colorMode === "dark" ? "wt" : "wt",
          boxShadow: "none",
        },
      }),
    },

    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "#000000cc" : "#ffffffcc",
          backdropFilter: "blur(10px)",
          color: props.colorMode === "dark" ? "wt" : "bt",
          border: "1px solid var(--divider)",
          boxShadow: "none",
          mx: 4,
        },
        footer: {
          px: 4,
        },
      }),
    },

    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "dark" ? "#000000cc" : "#ffffffcc",
          backdropFilter: "blur(10px)",
          border: "1px solid var(--divider)",
          p: 0,
          overflow: "hidden",
        },
        item: {
          bg: "transparent",
          _hover: { bg: "var(--divider)" },
        },
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 700,
        borderRadius: "4px",
      },
    },

    Input: {
      baseStyle: (props) => ({
        field: {
          _autofill: {
            boxShadow:
              props.colorMode === "dark"
                ? "0 0 0px 1000px #000000 inset"
                : "0 0 0px 1000px #ffffff inset",
            border: "2px solid var(--divider) !important",
          },
        },
      }),
    },

    Checkbox: {
      baseStyle: (props) => ({
        icon: {
          color: "wt",
        },
      }),
    },

    Tooltip: {
      baseStyle: {
        bg: "p.500",
        color: "w",
        "--popper-arrow-bg": "#6699ff",
      },
    },
  },
});
