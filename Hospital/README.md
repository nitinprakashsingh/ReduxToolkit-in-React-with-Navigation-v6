# Hospital Admin Panel

React admin panel for the Hospital API.

## Local development

```bash
cd Hospital
cp .env.example .env
npm ci
npm start
```

Set `REACT_APP_API_BASE_URL` to the backend API URL, including `/api`:

```env
REACT_APP_API_BASE_URL="http://localhost:5000/api"
```

## Production deployment

Deploy the `Hospital` folder as a static React site. Set this build-time environment variable in the hosting provider:

```env
REACT_APP_API_BASE_URL="https://api.example.com/api"
```

Then build and deploy the generated `build/` directory:

```bash
npm ci
npm run build
```

Configure the static host to return `index.html` for client-side routes, including `/dashboard`. The API URL must be public and its site origin must exactly appear in the backend `CLIENT_URLS` setting. Never place database URLs, passwords, or JWT secrets in this frontend environment file.
