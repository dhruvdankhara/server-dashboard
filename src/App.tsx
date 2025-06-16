import { type Component, createSignal, onMount } from "solid-js";
import { useServerManagement } from "./hooks/useServerManagement";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import AddServerForm from "./components/AddServerForm";
import ServerList from "./components/ServerList";

const App: Component = () => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [loginError, setLoginError] = createSignal("");
  // Check if user is already authenticated (stored in localStorage)
  onMount(() => {
    const storedAuth = localStorage.getItem("dashboard_authenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  });
  // Handle login
  const handleLogin = (password: string) => {
    const correctPassword = import.meta.env.VITE_DASHBOARD_PASSWORD?.trim();

    // Clear any previous error
    setLoginError("");

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("dashboard_authenticated", "true");
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };
  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dashboard_authenticated");
  };

  const {
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
    addServer,
    deleteServer,
    pingServer,
  } = useServerManagement();
  return (
    <>
      {!isAuthenticated() ? (
        <LoginForm onLogin={handleLogin} error={loginError()} />
      ) : (
        <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 sm:p-4">
          <div class="max-w-4xl mx-auto">
            <Header onLogout={handleLogout} />

            <AddServerForm
              newUrl={newUrl}
              setNewUrl={setNewUrl}
              newName={newName}
              setNewName={setNewName}
              addingServer={addingServer}
              onAddServer={addServer}
              status={status}
              statusType={statusType}
            />

            <ServerList
              servers={servers}
              pingingServer={pingingServer}
              deletingServer={deletingServer}
              pingingMessages={pingingMessages}
              onPingServer={pingServer}
              onDeleteServer={deleteServer}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
