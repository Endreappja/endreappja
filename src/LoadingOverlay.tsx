export function LoadingOverlay({ loading }: { loading: boolean }) {
  if (!loading) return null;

    const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    pointerEvents: "auto", // itt blokkoljuk a kattintásokat
  };

  const spinnerStyle: React.CSSProperties = {
    width: "3.5rem",
    height: "3.5rem",
  };

  return (
    <div style={overlayStyle} aria-hidden={!loading} aria-busy={loading}>
      <div
        className="spinner-border text-light"
        role="status"
        style={spinnerStyle}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}