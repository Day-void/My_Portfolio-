import { useEffect } from "react";

const FONT_SIZE = 16;
const FRAME_INTERVAL = 1000 / 30 - 2;
const MAX_DPR = 2;

export function useBinaryWave(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops = [];
    let time = 0;
    let lastFrame = 0;
    let animationId = null;
    let resizeTimer;

    const paintStatic = () => {
      ctx.fillStyle = "rgb(4, 10, 7)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px monospace`;
      for (let i = 0; i < columns; i++) {
        for (let k = 0; k < 6; k++) {
          ctx.fillStyle = `rgba(64, 217, 145, ${0.1 + Math.random() * 0.35})`;
          ctx.fillText(
            Math.random() > 0.5 ? "1" : "0",
            i * FONT_SIZE,
            Math.random() * height
          );
        }
      }
    };

    const paintFrame = () => {
      ctx.fillStyle = "rgba(4, 10, 7, 0.3)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < columns; i++) {
        const phase = time * 0.02 + i * 0.3;
        const y = drops[i] + Math.sin(phase) * 22;
        const brightness = 0.35 + Math.abs(Math.sin(phase)) * 0.65;

        ctx.fillStyle = `rgba(64, 217, 145, ${brightness})`;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * FONT_SIZE, y);

        drops[i] += 2.8;
        if (drops[i] > height) drops[i] = -FONT_SIZE;
      }

      time += 2;
    };

    const loop = (now) => {
      animationId = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;
      paintFrame();
    };

    const start = () => {
      if (animationId === null && !document.hidden && !motionQuery.matches) {
        animationId = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const resize = () => {
      const nextWidth = canvas.offsetWidth;
      const nextHeight = canvas.offsetHeight;
      if (nextWidth === width && nextHeight === height) return;

      const widthChanged = nextWidth !== width;
      width = nextWidth;
      height = nextHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (widthChanged) {
        columns = Math.floor(width / FONT_SIZE);
        drops = Array.from({ length: columns }, () => Math.random() * height);
      }

      if (motionQuery.matches) paintStatic();
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    const handleMotionChange = () => {
      stop();
      if (motionQuery.matches) paintStatic();
      else start();
    };

    resize();
    if (motionQuery.matches) paintStatic();
    else start();

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [canvasRef]);
}
