// Configuration file for API endpoints

/**
 * Determine the server URL to use
 * This function tries to intelligently detect the server location
 */
const getServerUrl = () => {
  // In production, API calls are relative to the host
  if (!import.meta.env.DEV) {
    return "";
  }
  
  // In development, we try to detect the server
  // This implementation assumes the server is running on localhost
  // The default port is 8080, but we could potentially check others
  const possiblePorts = [8080, 3000, 5000, 4000];
  
  // If we know the server is running on a specific port, use it directly
  const serverPort = import.meta.env.VITE_SERVER_PORT;
  if (serverPort) {
    return `http://localhost:${serverPort}`;
  }
  
  // Default to 8080
  return "http://localhost:8080";
};

export const API_BASE_URL = getServerUrl(); 