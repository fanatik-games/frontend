import { WS_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
type WsEvent = {
  event: "PURCHASE_CONFIRMED" | "PAYOUT_CONFIRMED" | "FIXTURES_UPDATED";
  data: Record<string, string>;
};
export default function useRealtime() {
  const [data, setData] = useState<WsEvent | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("Websockets connected");
    };

    socket.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    return () => {
      socket.close();
    };
  }, []);

  return {
    data,
  };
}
