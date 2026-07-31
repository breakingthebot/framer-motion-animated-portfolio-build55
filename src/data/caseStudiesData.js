// src/data/caseStudiesData.js
// Enterprise case studies dataset with architecture diagrams and scale metrics.
// Connects to: src/components/CaseStudyModal.jsx, src/App.jsx
// Created: 2026-07-31

export const caseStudiesList = [
  {
    id: 'cs-1',
    title: 'High-Throughput Microservice & Distributed Event Bus Engine',
    subtitle: 'Event-Driven Real-Time Distributed Architecture with Zero Data Loss Guarantees',
    category: 'System Architecture & Backend',
    scaleMetrics: {
      throughput: '150,000 RPS',
      latency: '12ms P99',
      availability: '99.99% SLA',
      dataVolume: '4.2 TB / Day'
    },
    executiveSummary: 'Designed and deployed a fault-tolerant, event-driven microservice bus architecture handling over 150,000 requests per second with 12ms P99 latency. Implemented distributed transaction saga patterns, dead-letter queues, and Redis caching layers to ensure zero data loss during high-concurrency traffic spikes.',
    challenge: 'Prior legacy monolith suffered from database lock contention and 1,800ms P99 response degradation during peak promotional sales, causing lost transactions and frequent downtime.',
    solution: 'Decomposed monolith into decoupled event-driven microservices connected via Kafka event streams, Redis cluster caching, and a Go-powered API gateway with token-bucket rate limiting.',
    architectureNodes: [
      { id: 'client', label: 'Web / Mobile Clients', type: 'entry' },
      { id: 'gateway', label: 'Go API Gateway (Rate Limited)', type: 'gateway' },
      { id: 'kafka', label: 'Kafka Event Bus (Partitions x64)', type: 'bus' },
      { id: 'service-a', label: 'Order Processing Service (Go)', type: 'service' },
      { id: 'service-b', label: 'Inventory Sync Worker (Rust)', type: 'service' },
      { id: 'cache', label: 'Redis Enterprise Cluster', type: 'cache' },
      { id: 'db', label: 'PostgreSQL Primary (Sharded)', type: 'db' }
    ],
    techStack: ['Go (Golang)', 'Rust', 'Apache Kafka', 'Redis Cluster', 'PostgreSQL', 'Docker', 'Kubernetes', 'gRPC'],
    codeHighlight: `// Go API Gateway High-Throughput Token Bucket Limiter
func (g *Gateway) HandleRequest(w http.ResponseWriter, r *http.Request) {
    clientIP := r.RemoteAddr
    if !g.limiter.Allow(clientIP) {
        http.Error(w, "Rate limit exceeded - 429", http.StatusTooManyRequests)
        return
    }
    event := g.pool.Get().(*Event)
    defer g.pool.Put(event)
    
    if err := g.kafkaProducer.Publish("events.orders", event); err != nil {
        g.logger.Error("Kafka publish failed", zap.Error(err))
        g.fallbackQueue.Push(event)
    }
}`,
    demoUrl: 'https://framer-motion-animated-portfolio-bu.vercel.app',
    githubUrl: 'https://github.com/breakingthebot/286-builds'
  },
  {
    id: 'cs-2',
    title: 'Real-Time Collaborative Web Canvas & Signal Engine',
    subtitle: 'Ultra-Low Latency Canvas Synchronization with WebSockets & CRDT State Conflict Resolution',
    category: 'Full-Stack & Real-Time Web',
    scaleMetrics: {
      throughput: '45,000 Msg/sec',
      latency: '< 8ms Frame Sync',
      availability: '99.95% Uptime',
      dataVolume: '50,000 Active Sessions'
    },
    executiveSummary: 'Engineered a multi-user interactive canvas engine enabling concurrent real-time vector editing across 50,000 active browser sessions. Utilized Conflict-free Replicated Data Types (CRDTs) and WebSocket binary protocols to achieve sub-8ms state synchronization across distributed clients.',
    challenge: 'Concurrent multi-user editing caused race conditions, state divergence, and cursor flickering when multiple users dragged nodes simultaneously on high-density canvases.',
    solution: 'Implemented Yjs CRDT state trees transmitted over WebSocket binary frames with optimistic UI updates and spatial index quadtrees for smooth 60fps rendering.',
    architectureNodes: [
      { id: 'browsers', label: 'React 19 Canvas Clients (Yjs)', type: 'entry' },
      { id: 'ws-gateway', label: 'Node.js WebSocket Cluster', type: 'gateway' },
      { id: 'crdt-engine', label: 'CRDT Conflict Resolver', type: 'service' },
      { id: 'pubsub', label: 'Redis Pub/Sub Engine', type: 'bus' },
      { id: 'persistence', label: 'S3 Canvas Snapshots', type: 'db' }
    ],
    techStack: ['React 19', 'Framer Motion', 'WebSockets', 'Yjs (CRDT)', 'Node.js', 'HTML5 Canvas API', 'Redis Pub/Sub'],
    codeHighlight: `// Yjs CRDT Vector Sync Engine
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const doc = new Y.Doc();
const provider = new WebsocketProvider('wss://ws.canvas.engine', 'room-55', doc);
const yNodes = doc.getArray('nodes');

yNodes.observe((event) => {
  event.changes.delta.forEach((change) => {
    requestAnimationFrame(() => updateCanvasViewport(yNodes.toArray()));
  });
});`,
    demoUrl: 'https://framer-motion-animated-portfolio-bu.vercel.app',
    githubUrl: 'https://github.com/breakingthebot/framer-motion-animated-portfolio-build55'
  },
  {
    id: 'cs-3',
    title: 'Enterprise Multi-Framework Design System & Web Component Library',
    subtitle: 'Unified Glassmorphism Design Tokens & Micro-Frontend Component Suite',
    category: 'Design Systems & Frontend Architecture',
    scaleMetrics: {
      throughput: '120+ Micro-Apps',
      latency: 'Zero Runtime Overhead',
      availability: '100% WCAG 2.1 AA',
      dataVolume: '45+ UI Components'
    },
    executiveSummary: 'Architected a multi-framework enterprise design system and Web Components UI suite powering over 120 internal micro-applications across React, Vue 3, Svelte 5, and Angular 19. Enforced full WCAG 2.1 AA accessibility compliance and theme token isolation.',
    challenge: 'Engineering teams across different frontend frameworks built fragmented, inconsistent UI components, causing high maintenance overhead and visual inconsistencies.',
    solution: 'Built framework-agnostic Lit 3.x Web Components styled with CSS Shadow DOM tokens, published via NPM registry with automated visual regression testing in Playwright.',
    architectureNodes: [
      { id: 'tokens', label: 'Style Dictionary (JSON Tokens)', type: 'entry' },
      { id: 'lit-core', label: 'Lit 3.x Web Components (Shadow DOM)', type: 'service' },
      { id: 'wrappers', label: 'Framework Wrappers (React/Vue/Svelte)', type: 'gateway' },
      { id: 'storybook', label: 'Interactive Component Storybook', type: 'bus' },
      { id: 'npm', label: 'Enterprise NPM Registry', type: 'db' }
    ],
    techStack: ['Lit 3.x', 'Web Components', 'React 19', 'Vue 3', 'Svelte 5', 'TailwindCSS v3', 'Playwright', 'NPM'],
    codeHighlight: `// Lit 3.x Encapsulated Web Component with Design Tokens
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('enterprise-card')
export class EnterpriseCard extends LitElement {
  static styles = css\`
    :host {
      display: block;
      background: var(--surface-glass, rgba(15, 23, 42, 0.8));
      border: 1px solid var(--border-glow, rgba(56, 189, 248, 0.3));
      border-radius: 16px;
      padding: 1.5rem;
    }
  \`;

  render() {
    return html\`<slot></slot>\`;
  }
}`,
    demoUrl: 'https://framer-motion-animated-portfolio-bu.vercel.app',
    githubUrl: 'https://github.com/breakingthebot/lit3-component-library-build54'
  }
];
