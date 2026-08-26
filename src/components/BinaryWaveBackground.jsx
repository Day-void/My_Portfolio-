import { useRef } from "react";
import { useBinaryWave } from "../hooks/useBinaryWave";

export const BinaryWaveBackground = () => {
  const canvasRef = useRef(null);
  useBinaryWave(canvasRef);

  return <canvas ref={canvasRef} className="binary-wave-canvas" />;
};
