# TechDojo VR Scene Builder

A complete 3D web application that allows users to sign up, log in, and interact with a 3D scene by adding, dragging, and saving 3D objects. Built for a technical interview submission.

## 🔗 Links
- **Live Demo**: [Live Vercel URL here (update after deployment)](#)
- **GitHub Repository**: [https://github.com/SHUVASHIS01/techdojo-vr-scene](https://github.com/SHUVASHIS01/techdojo-vr-scene)

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + Three.js (@react-three/fiber, @react-three/drei, @use-gesture/react)
- **Backend**: Express.js (Node.js REST API)
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Auth**: Express-session + bcryptjs + connect-mongo
- **Hosting**: Vercel (Frontend) + Render (Backend)

## ✨ Features
- [x] Full-stack user authentication (Signup, Login, Logout)
- [x] Protected routes and secure HTTP-only cookie sessions
- [x] Interactive 3D Canvas powered by React Three Fiber
- [x] Dynamic Object Addition via custom dialog menu (Cube, Sphere, Custom GLTF Models)
- [x] Smooth 3D Drag & Drop functionality using Raycasting on a floor plane
- [x] Interactive micro-animations (scale up, emissive glow, floating effect during drag)
- [x] Real-time Scene Saving to MongoDB Cloud
- [x] Scene persistence (automatically load user's last saved scene on login)
- [x] Fully responsive, polished dark mode UI with interactive feedback (Toasts, loaders)

## 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SHUVASHIS01/techdojo-vr-scene.git
   cd techdojo-vr-scene
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   # Copy the example environment variables
   cp .env.example .env 
   # Run the server (starts on http://localhost:5000)
   npm start
   ```

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   # Copy the example environment variables
   cp .env.example .env
   # Start the Vite development server
   npm run dev
   ```

## 🚀 Deployment Notes

- **Backend (Render):** Connected via GitHub. Environment variables set in the dashboard (`MONGODB_URI`, `SESSION_SECRET`, `CLIENT_URL`, `NODE_ENV=production`).
- **Frontend (Vercel):** Configured as a Vite project. The `VITE_API_URL` environment variable is set to the Render backend URL.
- Both services require CORS and Cookie settings to support `withCredentials: true` and `SameSite: "none"` over HTTPS.

## 🎨 Design Decisions
- **Orthographic Camera:** Switched from PerspectiveCamera to OrthographicCamera to eliminate perspective-based size distortion when compositing 3D objects over a flat background image. This ensures all objects maintain consistent visual size regardless of their position in the scene.
- **Camera Controls (Important):** Camera zoom and rotation are intentionally disabled to maintain visual consistency between the 3D canvas layer and the CSS background room image. Only panning is enabled, which keeps the illusion of objects sitting inside the room seamless.

## 🧗 Challenges Faced
- **3D Drag & Drop**: Calculating 3D intersections correctly without breaking the OrbitControls.
  - *Solution*: Leveraged `@use-gesture/react` and Three.js Raycaster against a mathematical `THREE.Plane` representing the floor (Y=0) to lock the Y-axis. Disabled `OrbitControls` conditionally during drag events.
- **Handling GLTF Models**: Ensuring model scale and materials update performantly during hover/drag interactions.
  - *Solution*: Pre-loaded `.glb` files via `useGLTF` and recursively traversed the meshes to clone and safely apply emissive properties dynamically without modifying the cached source scene.

## 🧠 New Skills Gained
- Advanced state management linking standard React DOM components (UI Overlays) with Canvas 3D components.
- Secure, cross-origin Session Cookie management for production API deployments.
- Using `@react-three/drei` helpers alongside complex custom Raycasting logic.

## 🤖 AI Tools Workflow
- Utilized AI assistants for rapid boilerplate generation (Express Auth flow, Vite setup).
- AI was highly instrumental in architecting the communication between the Drag gestures and Three.js internal math objects, significantly speeding up the implementation of interactive physics features.
