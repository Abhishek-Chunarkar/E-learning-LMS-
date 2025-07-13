# Port Configuration Guide

This document explains how to configure the client and admin applications to work with different server ports.

## Server Port Configuration

The server runs on the port specified in the `PORT` environment variable, defaulting to 3000 if not set.

```javascript
// in server/index.js
const PORT = process.env.PORT || 3000;
```

## Client and Admin Configuration

Both the client and admin applications now use a dynamic approach to detect the server:

1. By default, they will attempt to connect to `http://localhost:8080`
2. You can specify a custom server port by creating an `.env.local` file in both the client and admin directories

### Example .env.local file for client and admin

```
# Server configuration
# Set this to the port your server is running on
VITE_SERVER_PORT=3000
```

## Running with Different Ports

### Starting the Server on a Custom Port

```bash
# For Windows PowerShell
$env:PORT=3000; npm start

# For Windows CMD
set PORT=3000 && npm start

# For Linux/Mac
PORT=3000 npm start
```

### Starting the Client and Admin

The client and admin will automatically use the port specified in their `.env.local` files.

```bash
# Start the client
cd client
npm run dev

# Start the admin
cd admin
npm run dev
```

## CORS Configuration

The server is now configured to accept connections from any localhost port, so the client and admin can run on any available port.