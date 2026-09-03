import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ compact = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`theme-toggle ${compact ? "theme-toggle-compact" : ""}`}
    >
      <span className="theme-toggle-icon">
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </span>
      {!compact && (
        <span className="hidden sm:inline">
          {isDark ? "Light mode" : "Dark mode"}
        </span>
      )}
    </button>
  );
}
