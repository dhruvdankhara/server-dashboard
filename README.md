# Server Dashboard

A modern, mobile-friendly web dashboard for managing and monitoring server services. Perfect for keeping track of your Render deployments, Heroku dynos, or any other web services that might go to sleep due to inactivity.

![Server Dashboard](https://img.shields.io/badge/status-active-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?logo=solid&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- 🚀 **One-click server wake-up** - Instantly ping and wake sleeping services
- ⏱️ **Live ping timing** - Real-time monitoring with duration tracking
- 📱 **Mobile-first design** - Fully responsive and touch-friendly interface
- 🎨 **Modern dark UI** - Beautiful, clean interface built with Tailwind CSS
- 🗄️ **Persistent storage** - Your server list is saved using Supabase
- 🏷️ **Custom server names** - Give your servers memorable names
- ⚡ **Real-time updates** - Live status updates and automatic refresh
- � **Password protection** - Secure access with environment-based authentication
- �🔒 **TypeScript support** - Type-safe development experience

## 🛠️ Tech Stack

- **Frontend**: [SolidJS](https://solidjs.com/) - Reactive JavaScript framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast development and build tool
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Database**: [Supabase](https://supabase.com/) - Open source Firebase alternative
- **Language**: [TypeScript](https://typescriptlang.org/) - Type-safe JavaScript

## 📦 Quick Start

### Prerequisites

- Node.js 16+ and npm
- A Supabase account (free tier available)

### Installation

1. **Clone the repository**:

   ```bash
   git clone http://github.com/dhruvdankhara/server-dashboard.git
   cd server-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Supabase**:

   a. Create a new project at [supabase.com](https://supabase.com)

   b. In your Supabase dashboard, go to the SQL editor and run:

   ```sql
   CREATE TABLE servers (
     id BIGSERIAL PRIMARY KEY,
     url TEXT NOT NULL UNIQUE,
     name TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **Configure environment variables**:

   ```bash
   # Create .env file in the project root
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DASHBOARD_PASSWORD=your_secure_password
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

## 📖 Usage

### Initial Access

1. When you first visit the dashboard, you'll be prompted to enter a password
2. Enter the password you set in your `VITE_DASHBOARD_PASSWORD` environment variable
3. Your authentication will be remembered in your browser session
4. Use the logout button (top-right) to sign out when needed

### Adding Servers

1. Enter your server URL in the input field
2. Optionally provide a custom name for easy identification
3. Click "Add Server" to save it to your list

### Waking Servers

1. Find your server in the list
2. Click the "Wake" button to send a ping request
3. Watch the live timer and ping duration display
4. Status messages will show success/failure with auto-clearing

### Managing Servers

- **Edit**: Click on server names to modify them
- **Delete**: Use the delete button to remove servers from your list
- **Monitor**: Keep track of ping times and server responsiveness

## 📁 Project Structure

```
server-dashboard/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and icons
│   ├── lib/
│   │   └── supabase.ts    # Supabase client configuration
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Application entry point
│   └── index.css          # Global styles and Tailwind imports
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on every push

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Environment Variables

| Variable                  | Description                   | Required |
| ------------------------- | ----------------------------- | -------- |
| `VITE_SUPABASE_URL`       | Your Supabase project URL     | Yes      |
| `VITE_SUPABASE_ANON_KEY`  | Your Supabase anonymous key   | Yes      |
| `VITE_DASHBOARD_PASSWORD` | Password for dashboard access | Yes      |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information about your problem
3. Include your environment details and steps to reproduce

## 🙏 Acknowledgments

- [SolidJS](https://solidjs.com/) for the reactive framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vite](https://vitejs.dev/) for the development experience

---

**Made with ❤️ to keep servers awake**
