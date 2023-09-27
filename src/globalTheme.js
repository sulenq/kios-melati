import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  colors: {
    p: {
      50: "#f1f8ff",
      100: "#DDECFD",
      200: "#BBD7FC",
      300: "#98BDF6",
      400: "#7CA4EC",
      500: "#5281e1",
      600: "#3B63C1",
      700: "#2948A2",
      800: "#1A3182",
      900: "#0F216C",
    },
    ap: {
      50: "#5281e1",
      100: "#5281e1",
      200: "#5281e1",
      300: "#5281e1",
      400: "#5281e1",
      500: "#5281e1",
      600: "#5281e1",
      700: "#5281e1",
      800: "#5281e1",
      900: "#5281e1",
    },
    bnw: {
      200: "white",
      300: "white",
      500: "#050505",
      600: "#050505",
    },
    wnb: {
      200: "#050505",
      300: "#050505",
      500: "white",
      600: "white",
    },
    b: "#050505",
    bt: "#333333",
    w: "white",
    wt: "#eee",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#050505" : "white",
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

    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "dark" ? "#050505" : "white",
        },
        item: {
          bg: props.colorMode === "dark" ? "#050505" : "white",
        },
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 700,
        borderRadius: "8px",
      },
    },

    Input: {
      baseStyle: (props) => ({
        field: {
          _autofill: {
            boxShadow:
              props.colorMode === "dark"
                ? "0 0 0px 1000px #050505 inset"
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
        "--popper-arrow-bg": "#5281e1",
      },
    },
  },
});
