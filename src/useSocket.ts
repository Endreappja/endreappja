import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const retriesRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function connect() {
      const s = io(url, { transports: ["websocket"] });

      s.on("connect", () => {
        console.log("✅ Socket connected");
        retriesRef.current = 0;
        setSocket(s); // ← itt állítjuk a state-et
      });

      s.on("disconnect", () => {
        console.log("⚠️ Socket disconnected");
        scheduleReconnect();
        setSocket(null);
      });

      s.on("connect_error", (err) => {
        console.log("❌ Connect error:", err.message);
        scheduleReconnect();
        setSocket(null);
      });
    }

    function scheduleReconnect() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const retryDelay = Math.min(1000 * 2 ** retriesRef.current, 10000);
      retriesRef.current += 1;
      timeoutRef.current = setTimeout(connect, retryDelay);
    }

    connect();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      socket?.disconnect();
    };
  }, [url]);

  return socket;
}