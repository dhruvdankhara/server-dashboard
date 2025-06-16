import { type Component, type Accessor, type Setter } from "solid-js";
import { AiOutlineLoading3Quarters } from "solid-icons/ai";
import StatusMessage from "./StatusMessage";

interface AddServerFormProps {
  newUrl: Accessor<string>;
  setNewUrl: Setter<string>;
  newName: Accessor<string>;
  setNewName: Setter<string>;
  addingServer: Accessor<boolean>;
  onAddServer: () => void;
  status: Accessor<string>;
  statusType: Accessor<"success" | "error" | "info">;
}

const AddServerForm: Component<AddServerFormProps> = (props) => {
  return (
    <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-4 sm:p-6 mb-4 sm:mb-6">
      <h2 class="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <span class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xs sm:text-sm">
          +
        </span>
        Add New Server
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onAddServer();
        }}
        class="space-y-3 sm:space-y-4"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <input
              type="url"
              placeholder="Server URL (e.g., https://myapp.render.com)"
              value={props.newUrl()}
              onInput={(e) => props.setNewUrl(e.target.value)}
              required
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Server Name (optional)"
              value={props.newName()}
              onInput={(e) => props.setNewName(e.target.value)}
              class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={props.addingServer() || !props.newUrl().trim()}
          class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
        >
          {props.addingServer() ? (
            <AiOutlineLoading3Quarters class="animate-spin" />
          ) : (
            "+"
          )}
          {props.addingServer() ? "Adding..." : "Add Server"}
        </button>
      </form>

      {/* Status Message */}
      {props.status() && (
        <StatusMessage message={props.status} type={props.statusType} />
      )}
    </div>
  );
};

export default AddServerForm;
