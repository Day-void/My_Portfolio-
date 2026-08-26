import { useEffect } from "react";

export function useBinaryWave(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fontSize = 16;
    let columns = 0;
    let drops = [];
    let time = 0;
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * canvas.height);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(4, 10, 7, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const wave = Math.sin(time * 0.02 + i * 0.3) * 22;
        const x = i * fontSize;
        const y = drops[i] + wave;

        const char = Math.random() > 0.5 ? "1" : "0";
        const brightness = 0.35 + Math.abs(Math.sin(time * 0.02 + i * 0.3)) * 0.65;

        ctx.fillStyle = `rgba(64, 217, 145, ${brightness})`;
        ctx.fillText(char, x, y);

        drops[i] += 1.4;
        if (drops[i] > canvas.height) {
          drops[i] = -fontSize;
        }
      }

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);
}
