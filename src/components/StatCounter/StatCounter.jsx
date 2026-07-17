import { useEffect, useRef, useState } from "react";
import { stripAccents } from "../../utils/text";
import "./StatCounter.css";

export default function StatCounter({ value, label, suffix, variant }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let rafId = null;

    function animateCount() {
      const duration = 1500;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      }

      rafId = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount();
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <div className={`stat-counter ${variant === "inline" ? "stat-counter-inline" : ""}`} ref={ref}>
      <span className="stat-counter-value">
        {count}
        {suffix}
      </span>
      <span className="stat-counter-label">{stripAccents(label)}</span>
    </div>
  );
}
