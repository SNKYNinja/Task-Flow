import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontSize: {
                semiheading: "clamp(1.5rem, 2vw, 2rem)",
            },
            height: {
                sidebar: "calc(100vh - 2rem)",
            },
            colors: {
                border: "rgba(249,249,249, 0.08)",
                "active-link": "var(--active-link)",
                "active-link-hover": "var(--active-link-hover)",
                muted: "var(--text-muted)",
                icon: "rgba(249,249,249, 0.75)",
            },
            backgroundColor: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            transitionTimingFunction: {
                profile: "cubic-bezier(0.53, 0.21, 0, 1)",
            },
            boxShadow: {
                card: "0px 48px 77px  rgba(8, 18, 69, 0.16)",
                modal: "0 0 1rem rgba(0, 0, 0, 0.3)",
                button: "0 3px 15px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
