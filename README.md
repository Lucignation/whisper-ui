# whisper-ui

Whisper UI is a React + TypeScript + Vite frontend.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the Firebase web app values.
4. Start the app with `npm run dev`.

## Public env vars

This project uses `VITE_*` variables for Firebase web app config. Those values are sent to the browser by Vite, so they must be safe to expose publicly.

Recommended variable names:

```bash
VITE_FB_WEB_KEY=
VITE_FB_APP_DOMAIN=
VITE_FB_PROJECT_ID=
VITE_FB_STORAGE_BUCKET=
VITE_FB_SENDER_ID=
VITE_FB_APP_ID=
VITE_FB_MEASUREMENT_ID=
```

These are public client config values, not server secrets. Firebase protects access through Authentication, Security Rules, IAM, and App Check.

## Secret env vars

Do not place secrets in any variable prefixed with `VITE_`.

Examples of server-only secrets:

```bash
FIREBASE_ADMIN_PRIVATE_KEY=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

Secrets like these should live in a backend service, serverless function, or other server-only environment.

## Backward compatibility

The app still supports the older `VITE_PUBLIC_FIREBASE_*` names for now, but new setup should use the `VITE_FB_*` names instead.

## Vercel

When deploying on Vercel, add the same public Firebase values from `.env.example` in Project Settings > Environment Variables.
