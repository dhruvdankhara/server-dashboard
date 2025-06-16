import { type Component, type Accessor } from "solid-js";
import {
  AiOutlineDelete,
  AiOutlineReload,
  AiOutlineLoading3Quarters,
} from "solid-icons/ai";
import { type ServerUrl } from "../lib/supabase";

interface PingMessage {
  message: string;
  timestamp: string;
  type: "pinging" | "success" | "error";
  duration?: string;
  startTime?: number;
}

interface ServerCardProps {
  server: ServerUrl;
  pingingServer: Accessor<number | null>;
  deletingServer: Accessor<number | null>;
  pingingMessages: Accessor<{ [key: number]: PingMessage }>;
  onPingServer: (server: ServerUrl) => void;
  onDeleteServer: (id: number) => void;
}

const ServerCard: Component<ServerCardProps> = (props) => {
  return (
    <div class="bg-gray-700/30 border border-gray-600 rounded-lg p-3 sm:p-4 hover:bg-gray-700/50 transition-all duration-300">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <h3 class="font-medium text-white text-sm sm:text-base truncate">
              {props.server.name || "Unnamed Server"}
            </h3>
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
          </div>
          <p class="text-xs sm:text-sm text-gray-400 break-all mb-2 sm:mb-0">
            {props.server.url}
          </p>

          {/* Ping Status */}
          {props.pingingMessages()[props.server.id] && (
            <div
              class={`text-xs sm:text-sm mt-2 p-2 rounded ${
                props.pingingMessages()[props.server.id].type === "pinging"
                  ? "bg-blue-900/30 text-blue-300"
                  : props.pingingMessages()[props.server.id].type === "success"
                  ? "bg-green-900/30 text-green-300"
                  : "bg-red-900/30 text-red-300"
              }`}
            >
              <div class="flex items-center justify-between">
                <span>{props.pingingMessages()[props.server.id].message}</span>
                <span class="text-xs opacity-75">
                  {props.pingingMessages()[props.server.id].timestamp}
                </span>
              </div>
            </div>
          )}
        </div>

        <div class="flex gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={() => props.onPingServer(props.server)}
            disabled={
              props.pingingServer() === props.server.id ||
              props.deletingServer() === props.server.id
            }
            class="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-1.5 font-medium shadow-lg hover:shadow-green-500/25 text-xs sm:text-sm"
          >
            {props.pingingServer() === props.server.id ? (
              <AiOutlineLoading3Quarters class="animate-spin" />
            ) : (
              <AiOutlineReload />
            )}
            <span class="hidden sm:inline">
              {props.pingingServer() === props.server.id
                ? "Pinging..."
                : "Wake"}
            </span>
            <span class="sm:hidden">
              {props.pingingServer() === props.server.id ? "..." : "Wake"}
            </span>
          </button>

          <button
            onClick={() => props.onDeleteServer(props.server.id)}
            disabled={
              props.deletingServer() === props.server.id ||
              props.pingingServer() === props.server.id
            }
            class="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-1.5 font-medium shadow-lg hover:shadow-red-500/25 text-xs sm:text-sm"
          >
            {props.deletingServer() === props.server.id ? (
              <AiOutlineLoading3Quarters class="animate-spin" />
            ) : (
              <AiOutlineDelete />
            )}
            <span class="hidden sm:inline">
              {props.deletingServer() === props.server.id
                ? "Deleting..."
                : "Delete"}
            </span>
            <span class="sm:hidden">
              {props.deletingServer() === props.server.id ? "..." : "Del"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
