# Taquería El Costeño — Website

React + Vite website for Taquería El Costeño, Chicago.

## Project Structure

```
taqueria-el-costeno/
├── index.html              # Vite entry point
├── vite.config.js          # Vite config
├── package.json
├── public/
│   └── assets/             # ← All images go here
│       ├── logo.jpg
│       ├── carne.jpg
│       ├── drinks.jpg
│       ├── mole.jpg
│       └── quesadilla.jpg
└── src/
    ├── main.jsx            # Mounts React app
    ├── App.jsx             # All components
    ├── menu-data.js        # Menu content
    └── index.css           # All styles
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — this is what Netlify deploys.

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to netlify.com → "Add new site" → "Import from Git"
3. Select your repo
4. Build settings (Netlify auto-detects these):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click Deploy — done!

## Adding Online Ordering Later

### Option A: Square embed (easiest)
Add a new page/component and paste Square's embed snippet:
```jsx
function Order() {
  return (
    <section id="order">
      <h2>Order Online</h2>
      {/* Paste Square embed code here */}
    </section>
  );
}
```

### Option B: Stripe (custom checkout)
```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```
Then import and use Stripe's React components in a new Order component.
