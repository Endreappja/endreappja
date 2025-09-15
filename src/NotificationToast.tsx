type ToastItem = {
  id: string;
  title: string;
  body: string;
};

export function NotificationToast({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: (id: string) => void;
}) {
  return (
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        minWidth: 280,
        marginBottom: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div className="d-flex align-items-start">
        <div className="toast-body" style={{ padding: "12px 16px", flex: 1 }}>
          <strong className="d-block">{item.title}</strong>
          <div style={{ marginTop: 4 }}>{item.body}</div>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-light"
          aria-label="Close notification"
          onClick={() => onClose(item.id)}
          style={{
            borderRadius: 0,
            height: "100%",
            borderLeft: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
