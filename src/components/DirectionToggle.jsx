import { AlignLeft, AlignRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function DirectionToggle() {
  const [rtl, setRtl] = useState(() => localStorage.getItem("drivewise_direction") === "rtl");

  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.body.dir = rtl ? "rtl" : "ltr";
    localStorage.setItem("drivewise_direction", rtl ? "rtl" : "ltr");
  }, [rtl]);

  return (
    <button
      type="button"
      onClick={() => setRtl((value) => !value)}
      aria-label={rtl ? "Switch to left-to-right layout" : "Switch to right-to-left layout"}
      title={rtl ? "Switch to LTR" : "Switch to RTL"}
      className="direction-toggle"
    >
      {rtl ? <AlignRight size={15} /> : <AlignLeft size={15} />}
      <span>RTL</span>
    </button>
  );
}
