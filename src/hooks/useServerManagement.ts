import { createSignal, createResource } from "solid-js";
import { supabase, type ServerUrl } from "../lib/supabase";

interface PingMessage {
  message: string;
  timestamp: string;
  type: "pinging" | "success" | "error";
  duration?: string;
  startTime?: number;
}

export const useServerManagement = () => {
  const [newUrl, setNewUrl] = createSignal("");
  const [newName, setNewName] = createSignal("");
  const [addingServer, setAddingServer] = createSignal(false);
  const [deletingServer, setDeletingServer] = createSignal<number | null>(null);
  const [pingingServer, setPingingServer] = createSignal<number | null>(null);
  const [pingingMessages, setPingingMessages] = createSignal<{
    [key: number]: PingMessage;
  }>({});
  const [pingTimers, setPingTimers] = createSignal<{
    [key: number]: NodeJS.Timeout;
  }>({});
  const [status, setStatus] = createSignal("");
  const [statusType, setStatusType] = createSignal<
    "success" | "error" | "info"
  >("info");

  // Fetch servers from Supabase
  const [servers, { refetch }] = createResource<ServerUrl[]>(async () => {
    const { data, error } = await supabase
      .from("servers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setStatus(`Error: ${error.message}`);
      return [];
    }
    return data || [];
  });

  const addServer = async () => {
    const url = newUrl().trim();
    const name = newName().trim();
    if (!url) return;

    setAddingServer(true);
    try {
      const { error } = await supabase.from("servers").insert({
        url,
        name: name || null,
      });

      if (error) {
        setStatus(`Error: ${error.message}`);
        setStatusType("error");
      } else {
        setNewUrl("");
        setNewName("");
        setStatus("Server added successfully!");
        setStatusType("success");
        refetch();
      }
    } catch (error) {
      setStatus(`Error: ${error}`);
      setStatusType("error");
    } finally {
      setAddingServer(false);
      // Clear status after 3 seconds
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const deleteServer = async (id: number) => {
    setDeletingServer(id);
    try {
      const { error } = await supabase.from("servers").delete().eq("id", id);

      if (error) {
        setStatus(`Error: ${error.message}`);
        setStatusType("error");
      } else {
        setStatus("Server deleted successfully!");
        setStatusType("success");
        refetch();
      }
    } catch (error) {
      setStatus(`Error: ${error}`);
      setStatusType("error");
    } finally {
      setDeletingServer(null);
      // Clear status after 3 seconds
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const pingServer = async (server: ServerUrl) => {
    setPingingServer(server.id);
    const startTime = Date.now();

    // Clear any existing timer for this server
    const timers = pingTimers();
    if (timers[server.id]) {
      clearInterval(timers[server.id]);
    }

    // Set initial pinging message
    setPingingMessages((prev) => ({
      ...prev,
      [server.id]: {
        message: "Pinging...",
        timestamp: new Date().toLocaleTimeString(),
        type: "pinging",
        startTime: startTime,
      },
    }));

    // Start a timer to update ping duration in real-time
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = ((currentTime - startTime) / 1000).toFixed(1);
      setPingingMessages((prev) => ({
        ...prev,
        [server.id]: {
          ...prev[server.id],
          message: `Pinging... (${elapsed}s)`,
        },
      }));
    }, 100);

    setPingTimers((prev) => {
      const newTimers = { ...prev };
      newTimers[server.id] = timer;
      return newTimers;
    });

    try {
      await fetch(server.url, {
        method: "GET",
        mode: "no-cors",
      });

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      // Clear the timer
      clearInterval(timer);
      setPingTimers((prev) => {
        const newTimers = { ...prev };
        delete newTimers[server.id];
        return newTimers;
      });

      setPingingMessages((prev) => ({
        ...prev,
        [server.id]: {
          message: `Server woken up! (${duration}s)`,
          timestamp: new Date().toLocaleTimeString(),
          type: "success",
          duration: `${duration}s`,
        },
      }));

      // Clear message after 6 seconds
      setTimeout(() => {
        setPingingMessages((prev) => {
          const newMessages = { ...prev };
          delete newMessages[server.id];
          return newMessages;
        });
      }, 6000);
    } catch (error) {
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      // Clear the timer
      clearInterval(timer);
      setPingTimers((prev) => {
        const newTimers = { ...prev };
        delete newTimers[server.id];
        return newTimers;
      });

      setPingingMessages((prev) => ({
        ...prev,
        [server.id]: {
          message: `Ping sent! (${duration}s)`,
          timestamp: new Date().toLocaleTimeString(),
          type: "success",
          duration: `${duration}s`,
        },
      }));

      // Clear message after 6 seconds
      setTimeout(() => {
        setPingingMessages((prev) => {
          const newMessages = { ...prev };
          delete newMessages[server.id];
          return newMessages;
        });
      }, 6000);
    }
    setPingingServer(null);
  };

  return {
    // State
    newUrl,
    setNewUrl,
    newName,
    setNewName,
    addingServer,
    deletingServer,
    pingingServer,
    pingingMessages,
    status,
    statusType,
    servers,

    // Actions
    addServer,
    deleteServer,
    pingServer,
  };
};
