import { useScroll, useTransform, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIZE = 68; // Bigger button and SVG
const RADIUS = 30; // Bigger circle
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = 2.5; // Thinner ring

export default function ScrollChargeButton({ to, children }: { to: string, children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 1], [CIRCUMFERENCE, 0]);

  return (
    <Link
      to={to}
      className="floating-button bg-black text-white hover:bg-gray-900 relative z-10"
      style={{
        borderRadius: "50%",
        width: SIZE,
        height: SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Progress ring inside the button */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.2)" // subtle background ring
          strokeWidth={STROKE_WIDTH}
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="white"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          style={{
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.2s cubic-bezier(0.4,0,0.2,1)"
          }}
        />
      </svg>
      <span style={{ position: "relative", zIndex: 2, fontSize: 13, textAlign: "center" }}>
        {children}
      </span>
    </Link>
  );
} 