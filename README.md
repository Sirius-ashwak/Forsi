# Forsi - Supply Chain Resilience Platform

A next-generation AI-powered supply chain resilience platform built with React, TypeScript, and Three.js. Forsi provides real-time monitoring, predictive analytics, and interactive 3D visualization of global supply chain networks.

![Forsi Platform](https://img.shields.io/badge/Platform-Supply%20Chain-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.159.0-green)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)

## 🌟 Features

### 🌍 Interactive 3D Global Map
- **Real-time visualization** of supply chain nodes worldwide
- **Procedural Earth rendering** with satellite and standard view modes
- **Dynamic node status** indicators with real-time updates
- **Interactive tooltips** with detailed node information
- **Quantum particle effects** for enhanced visual appeal

### 🤖 AI-Powered Analytics
- **Predictive risk assessment** using advanced algorithms
- **Demand forecasting** with 94%+ accuracy
- **Supplier performance monitoring** and scoring
- **Automated alert generation** for critical issues
- **Natural language chat interface** for easy interaction

### 📊 Comprehensive Dashboard
- **Real-time KPI monitoring** with beautiful visualizations
- **Connected systems management** for ERP, logistics, and IoT
- **Analytics playground** for custom queries and analysis
- **Scenario builder** for what-if analysis
- **Interactive timeline** with predictive mode

### 🔗 Enterprise Integrations
- **SAP ERP** - Full enterprise resource planning integration
- **Oracle SCM Cloud** - Supply chain management connectivity
- **Microsoft Dynamics 365** - Business application integration
- **FedEx/UPS APIs** - Real-time logistics tracking
- **IoT Sensor Networks** - Live monitoring capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/forsi-platform.git
   cd forsi-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks

### Project Structure
```
src/
├── components/
│   ├── dashboard/           # Main dashboard components
│   │   ├── views/          # Dashboard view components
│   │   ├── ChatInterface.tsx
│   │   ├── KPICards.tsx
│   │   └── Sidebar.tsx
│   ├── intro/              # Landing page components
│   ├── layout/             # Layout components
│   ├── map/                # 3D map components
│   └── scenarios/          # Scenario builder
├── api-mocks/              # Mock data and API simulation
├── types/                  # TypeScript type definitions
├── index.css              # Global styles
└── main.tsx               # Application entry point
```

## 🎯 Key Components

### 3D Global Map (`GlobalMap3D.tsx`)
- Interactive Earth visualization with procedural textures
- Real-time supply chain node rendering
- Dynamic status indicators and animations
- Satellite and standard view modes
- Weather overlay capabilities

### AI Chat Interface (`ChatInterface.tsx`)
- Natural language processing for supply chain queries
- Real-time conversation with AI assistant
- Quick action suggestions
- Voice input support
- Contextual recommendations

### Analytics Playground (`Playground.tsx`)
- Code editor for custom analytics queries
- Multi-language support (Python, SQL, R, JavaScript)
- Real-time execution and results
- Export and sharing capabilities
- Risk analysis visualizations

### Connected Integrations (`ConnectedIntegrations.tsx`)
- System connection management
- Real-time sync status monitoring
- Health metrics and performance tracking
- Integration marketplace
- Automated setup workflows

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api.forsi.com
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_AI_API_KEY=your_ai_api_key
```

### Deployment Configuration
The platform is optimized for deployment on:
- **Render** (recommended)
- **Vercel**
- **Netlify**
- **AWS Amplify**

## 📈 Performance

### Optimization Features
- **Code splitting** for optimal loading
- **Lazy loading** of components
- **Memoization** for expensive calculations
- **WebGL acceleration** for 3D graphics
- **Service worker** for offline capabilities

### Metrics
- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB (gzipped)

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Render Deployment
1. Connect your GitHub repository to Render
2. Select "Web Service" as the service type
3. Use these settings:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: `Node`

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy to your hosting provider
# The built files will be in the 'dist' directory
```

## 🔒 Security

### Security Features
- **HTTPS enforcement** for all communications
- **API key encryption** for external services
- **Input sanitization** for user data
- **CORS protection** for API endpoints
- **Content Security Policy** headers

### Best Practices
- Regular dependency updates
- Security audit scanning
- Environment variable protection
- Access control implementation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety
- **Conventional Commits** for commit messages

## 📚 Documentation

### API Documentation
- [REST API Reference](docs/api.md)
- [WebSocket Events](docs/websockets.md)
- [Integration Guide](docs/integrations.md)

### User Guides
- [Getting Started](docs/getting-started.md)
- [Dashboard Overview](docs/dashboard.md)
- [3D Map Navigation](docs/3d-map.md)
- [Analytics Playground](docs/analytics.md)

## 🆘 Support

### Getting Help
- **Documentation**: [docs.forsi.com](https://docs.forsi.com)
- **Community Forum**: [community.forsi.com](https://community.forsi.com)
- **Email Support**: support@forsi.com
- **GitHub Issues**: For bug reports and feature requests

### Enterprise Support
For enterprise customers, we offer:
- 24/7 technical support
- Dedicated customer success manager
- Custom integration assistance
- Priority feature development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** community for 3D graphics capabilities
- **React** team for the excellent framework
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Vite** for lightning-fast development

## 🔮 Roadmap

### Q1 2025
- [ ] Advanced AI predictions with machine learning
- [ ] Mobile application for iOS and Android
- [ ] Enhanced collaboration features
- [ ] Advanced reporting and analytics

### Q2 2025
- [ ] Blockchain integration for supply chain transparency
- [ ] AR/VR visualization capabilities
- [ ] Advanced automation workflows
- [ ] Multi-tenant architecture

### Q3 2025
- [ ] Edge computing integration
- [ ] Advanced IoT device management
- [ ] Predictive maintenance capabilities
- [ ] Carbon footprint tracking

---

**Built with ❤️ by the Forsi Team**

For more information, visit [forsi.com](https://forsi.com)