import { type Component, type Accessor } from "solid-js";

interface StatusMessageProps {
  message: Accessor<string>;
  type: Accessor<"success" | "error" | "info">;
}

const StatusMessage: Component<StatusMessageProps> = (props) => {
  return (
    <div
      class={`mt-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
        props.type() === "success"
          ? "bg-green-900/50 border border-green-500 text-green-200"
          : props.type() === "error"
          ? "bg-red-900/50 border border-red-500 text-red-200"
          : "bg-blue-900/50 border border-blue-500 text-blue-200"
      }`}
    >
      {props.message()}
    </div>
  );
};

export default StatusMessage;
