import { type Component, createSignal } from "solid-js";
import { AiOutlineEye, AiOutlineEyeInvisible } from "solid-icons/ai";

interface LoginFormProps {
  onLogin: (password: string) => void;
  error: string;
}

const LoginForm: Component<LoginFormProps> = (props) => {
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onLogin(password());
  };

  return (
    <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div class="max-w-md w-full space-y-8">
        {" "}
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-2">Server Dashboard</h1>
          <p class="text-gray-400">Enter password to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} class="mt-8 space-y-6">
          <div class="relative">
            <label for="password" class="sr-only">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                name="password"
                type={showPassword() ? "text" : "password"}
                required
                class="appearance-none rounded-lg relative block w-full px-4 py-3 pr-12 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
                placeholder="Enter password"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword())}
              >
                {showPassword() ? (
                  <AiOutlineEyeInvisible class="h-5 w-5 text-gray-400 hover:text-gray-300" />
                ) : (
                  <AiOutlineEye class="h-5 w-5 text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>
          {props.error && (
            <div class="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {props.error}
            </div>
          )}{" "}
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors"
            >
              Access Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
