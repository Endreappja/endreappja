import { NotificationToast } from "./NotificationToast";

export type ToastItem = {
  id: string;
  title: string;
  body: string;
};

export function NotificationCenter({
  toasts,
  onClose,
}: {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 1060,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {toasts.map((t) => (
        <NotificationToast key={t.id} item={t} onClose={onClose} />
      ))}
    </div>
  );
}
