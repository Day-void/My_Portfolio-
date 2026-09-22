import { useOnScreen } from "../hooks/useOnScreen";

export const GlassPanel = ({ id, title, icon: Icon, children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2, once: true });

  return (
    <section id={id} className="glass-section">
      <div
        ref={ref}
        className={`glass-panel ${isVisible ? "glass-panel--visible" : ""}`}
      >
        {title && (
          <div className="glass-panel-header">
            {Icon && <Icon size={22} className="glass-panel-icon" aria-hidden="true" />}
            <h2>{title}</h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
