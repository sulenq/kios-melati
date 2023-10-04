import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  colors: {
    p: {
      50: "#f1f8ff",
      100: "#DDECFD",
      200: "#BBD7FC",
      300: "#98BDF6",
      400: "#7CA4EC",
      500: "#6699ff",
      600: "#3B63C1",
      700: "#2948A2",
      800: "#1A3182",
      900: "#0F216C",
    },
    ap: {
      50: "#6699ff",
      100: "#6699ff",
      200: "#6699ff",
      300: "#6699ff",
      400: "#6699ff",
      500: "#6699ff",
      600: "#6699ff",
      700: "#6699ff",
      800: "#6699ff",
      900: "#6699ff",
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

    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "#050505" : "white",
          color: props.colorMode === "dark" ? "wt" : "bt",
          border: "1px solid var(--divider)",
          boxShadow: "none",
          mx: 4,
        },
      }),
    },

    Menu: {
      baseStyle: (props) => ({
        list: {
          bg: props.colorMode === "dark" ? "#050505cc" : "#ffffffcc",
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
