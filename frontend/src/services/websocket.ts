export function connectDashboardWebSocket(
  onMessage: (data: unknown) => void,
  onError?: (error: Event) => void,
) {
  const socket = new WebSocket(
    "ws://localhost/ws/dashboard/",
  );

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    console.log("LIVE DATA FROM BACKEND:", data);

    onMessage(data);
  } catch (error) {
    console.error("Invalid WebSocket data:", error);
  }
};

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    onError?.(error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
}