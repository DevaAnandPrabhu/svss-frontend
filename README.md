# 🚘 Smart Vehicle Service System (SVSS)

A full-featured React app for managing vehicle service appointments, technicians, and reports.

---

## 📁 Project Structure

```
smart-vehicle-service-system/
│
├── public/
│   └── index.html              ← HTML shell
│
├── src/
│   ├── index.js                ← React entry point
│   ├── App.js                  ← Root component + Router
│   │
│   ├── styles/
│   │   └── global.css          ← All CSS (design tokens, layout, components)
│   │
│   ├── data/
│   │   └── mockData.js         ← All mock data (vehicles, appointments, services)
│   │
│   ├── hooks/
│   │   └── useToast.js         ← Toast notification hook
│   │
│   ├── utils/
│   │   └── formatters.js       ← Currency, date, string helpers
│   │
│   ├── components/             ← Reusable UI components
│   │   ├── Sidebar.js          ← Left navigation
│   │   ├── Topbar.js           ← Top header bar
│   │   ├── Modal.js            ← Reusable modal wrapper
│   │   ├── StatCard.js         ← KPI stat card
│   │   ├── StatusBadge.js      ← Coloured status pill
│   │   ├── MiniChart.js        ← Bar chart (CSS only)
│   │   └── ToastContainer.js   ← Toast notification renderer
│   │
│   └── pages/                  ← One file per route/page
│       ├── Dashboard.js        ← /
│       ├── Vehicles.js         ← /vehicles
│       ├── Appointments.js     ← /appointments
│       ├── Services.js         ← /services
│       └── Reports.js          ← /reports
│
└── package.json                ← Fixed dependencies
```

---

## ⚙️ Setup Steps

### Step 1 — Install Node.js
Download and install **Node.js v20+** from https://nodejs.org

Verify installation:
```bash
node -v   # should print v20.x.x or higher
npm -v    # should print 10.x.x or higher
```

---

### Step 2 — Create a new React project folder

```bash
mkdir smart-vehicle-service-system
cd smart-vehicle-service-system
```

---

### Step 3 — Copy all project files

Copy the provided files into the folder, maintaining the exact folder structure shown above.

Your folder should look like:
```
smart-vehicle-service-system/
  package.json
  public/
    index.html
  src/
    index.js
    App.js
    styles/global.css
    data/mockData.js
    hooks/useToast.js
    utils/formatters.js
    components/  (all .js files)
    pages/       (all .js files)
```

---

### Step 4 — Install dependencies

```bash
npm install
```

This installs:
- `react` & `react-dom` — core React
- `react-router-dom` — client-side routing
- `axios` — HTTP client (ready for API integration)
- `react-scripts` — build toolchain (Create React App)

---

### Step 5 — Start the development server

```bash
npm start
```

The app will open automatically at **http://localhost:3000**

---

### Step 6 — Build for production (optional)

```bash
npm run build
```

This creates an optimised production build in the `/build` folder.

---

## 🔗 Pages & Routes

| Route             | Page          | Description                          |
|-------------------|---------------|--------------------------------------|
| `/`               | Dashboard     | KPI cards, revenue chart, overview   |
| `/vehicles`       | Vehicles      | Vehicle cards, add vehicle form      |
| `/appointments`   | Appointments  | Appointment table, book/manage jobs  |
| `/services`       | Services      | Service catalog with pricing         |
| `/reports`        | Reports       | Technician & service analytics       |

---

## 🛠 Connecting to a Real Backend (axios)

`axios` is already installed. To connect a page to a real API, replace mock data with API calls.

**Example — load vehicles from API:**

```js
// src/pages/Vehicles.js
import axios from "axios";
import { useEffect, useState } from "react";

const [vehicles, setVehicles] = useState([]);

useEffect(() => {
  axios.get("https://your-api.com/vehicles")
    .then(res => setVehicles(res.data))
    .catch(err => console.error(err));
}, []);
```

---

## ❗ Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `react-scripts: command not found` | Run `npm install` again |
| `Cannot find module 'react'` | Check `package.json` has `"react"` in dependencies |
| Port 3000 already in use | Run `PORT=3001 npm start` |
| Blank white screen | Check browser console for import path errors |

---

## 📦 Dependencies (package.json)

```json
"dependencies": {
  "axios":            "^1.13.4",
  "react":            "^19.2.4",
  "react-dom":        "^19.2.4",
  "react-router-dom": "^7.13.0",
  "react-scripts":    "5.0.1"
}
```

> ⚠️ The original `package.json` was missing `react`, `react-dom`, and `react-scripts`.
> These are now fixed and added as direct dependencies.
