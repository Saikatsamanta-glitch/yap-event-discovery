# event-discovery-module

## Development Setup

1. Install project dependencies with `npm install`
2. Add following mapping to host file (Host file path for mac and linux `/etc/hosts`):
   ```bash
   127.0.0.1 local.yapsody.events
   ```
3. Google Map API require HTTPS connection, so we use `local-ssh-proxy` to add ssh to localhost. Run below command to start localserver with https connection:

   ```bash
   npm run dev | npx local-ssl-proxy --source 3001 --target 3000
   ```

4. Go to `https://local.yapsody.events:3001/`
