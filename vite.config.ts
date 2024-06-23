import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; //if you are using react

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode (e.g., .env, .env.production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: { //define global variable
      'process.env': {
        VITE_DEVELOPMENT_API: JSON.stringify(env.VITE_DEVELOPMENT_API),
      }
    }
  };
});
