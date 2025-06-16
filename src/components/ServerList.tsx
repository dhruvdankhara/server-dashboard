import { type Component, For, type Accessor } from "solid-js";
import { type ServerUrl } from "../lib/supabase";
import ServerCard from "./ServerCard";

interface PingMessage {
  message: string;
  timestamp: string;
  type: "pinging" | "success" | "error";
  duration?: string;
  startTime?: number;
}

interface ServerListProps {
  servers: Accessor<ServerUrl[] | undefined>;
  pingingServer: Accessor<number | null>;
  deletingServer: Accessor<number | null>;
  pingingMessages: Accessor<{ [key: number]: PingMessage }>;
  onPingServer: (server: ServerUrl) => void;
  onDeleteServer: (id: number) => void;
}

const ServerList: Component<ServerListProps> = (props) => {
  return (
    <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-4 sm:p-6">
      <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <span class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">
          📡
        </span>
        Your Servers ({props.servers()?.length || 0})
      </h2>

      <div class="space-y-3 sm:space-y-4">
        <For
          each={props.servers()}
          fallback={
            <div class="text-center py-8 sm:py-12 text-gray-400">
              <div class="text-4xl sm:text-6xl mb-3 sm:mb-4">🏁</div>
              <h3 class="text-lg sm:text-xl font-medium mb-2">
                No servers added yet
              </h3>
              <p class="text-sm sm:text-base">
                Add your first server above to get started!
              </p>
            </div>
          }
        >
          {(server) => (
            <ServerCard
              server={server}
              pingingServer={props.pingingServer}
              deletingServer={props.deletingServer}
              pingingMessages={props.pingingMessages}
              onPingServer={props.onPingServer}
              onDeleteServer={props.onDeleteServer}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export default ServerList;
