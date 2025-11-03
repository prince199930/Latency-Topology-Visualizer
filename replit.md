# Crypto Exchange Latency Map

## Overview
A Next.js application featuring an interactive 3D world map that visualizes cryptocurrency exchange server locations and real-time latency data across AWS, GCP, and Azure cloud providers.

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with TypeScript
- **3D Graphics**: Three.js via React Three Fiber (@react-three/fiber)
- **3D Helpers**: @react-three/drei for controls and utilities
- **Charts**: Recharts for historical latency visualization
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Key Features
1. **Interactive 3D Globe**: Rotate, zoom, and pan a textured 3D Earth with smooth controls
2. **Exchange Server Markers**: 15 major crypto exchanges (Binance, OKX, Bybit, Deribit, etc.) plotted on globe
3. **Cloud Provider Visualization**: Color-coded markers for AWS (orange), GCP (blue), Azure (blue)
4. **Real-time Latency Connections**: Animated pulse effects along curved paths between servers
5. **Historical Latency Charts**: Time-series visualization with 1h, 24h, 7d, 30d ranges
6. **Advanced Filtering**: Filter by exchange, cloud provider, latency range, search
7. **Performance Metrics Dashboard**: FPS, connection count, average latency monitoring
8. **Responsive Design**: Optimized for desktop and mobile

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page with Scene and UI components
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Scene.tsx          # Canvas wrapper for 3D scene
│   ├── Globe.tsx          # 3D Earth with texture
│   ├── ExchangeMarker.tsx # Server location markers
│   ├── LatencyConnection.tsx # Animated latency lines
│   ├── ControlPanel.tsx   # Filters and controls
│   ├── Legend.tsx         # Color/symbol legend
│   ├── PerformanceMetrics.tsx # System metrics
│   └── HistoricalChart.tsx # Time-series chart
├── data/                  # Static data
│   ├── exchanges.ts       # Exchange server locations
│   └── cloudRegions.ts    # Cloud provider regions
├── store/                 # State management
│   └── useAppStore.ts     # Zustand store
├── types/                 # TypeScript types
│   └── index.ts           # All type definitions
└── utils/                 # Utilities
    └── latencySimulator.ts # Mock latency data generator
```

## Recent Changes
- **2024-11-03**: Initial project setup with complete 3D visualization system
- Created all core components for 3D globe, markers, and connections
- Implemented mock latency data simulation with realistic patterns
- Added comprehensive filtering and control system
- Built performance monitoring dashboard

## Development

### Running the Application
```bash
npm run dev
```
The application runs on `http://localhost:5000` (configured for Replit environment).

### Key Implementation Details

#### Coordinate Conversion
The `latLonToVector3` function converts geographic coordinates to 3D positions on the sphere using spherical mathematics.

#### Latency Simulation
- Base latency calculated from geographic distance
- Random variations for realistic fluctuations
- Color coding: Green (<50ms), Yellow (50-150ms), Red (>150ms)

#### State Management
- Zustand store manages filters, selections, latency data, and performance metrics
- Reactive updates trigger re-renders of affected components

#### 3D Rendering
- React Three Fiber wraps Three.js in React components
- OrbitControls for camera manipulation
- Continuous animation loop for pulse effects

## User Preferences
- None specified yet

## Future Enhancements
- Integrate real network latency APIs (Cloudflare Radar, Pingdom)
- WebSocket support for true real-time updates
- Database persistence for historical data
- User accounts with saved configurations
- Advanced analytics and latency prediction
