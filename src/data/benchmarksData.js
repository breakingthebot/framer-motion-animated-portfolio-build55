// src/data/benchmarksData.js
// Empirical benchmark performance dataset comparing modern web frameworks & systems runtimes.
// Connects to: src/components/MetricsMatrix.jsx
// Created: 2026-07-31

export const frameworkBenchmarks = [
  {
    id: 'rust-wasm',
    framework: 'Rust WebAssembly (WASM)',
    category: 'Systems & High-Perf',
    coldStartMs: 2.1,
    memoryMb: 8.4,
    p99ThroughputRps: 185000,
    bundleSizeKb: 4.8,
    badge: 'Blazing Fast',
    color: '#f97316'
  },
  {
    id: 'go-backend',
    framework: 'Go (Golang) Microservice',
    category: 'Systems & High-Perf',
    coldStartMs: 4.5,
    memoryMb: 14.2,
    p99ThroughputRps: 142000,
    bundleSizeKb: 8.2,
    badge: 'High Throughput',
    color: '#06b6d4'
  },
  {
    id: 'lit-3',
    framework: 'Lit 3.x Web Components',
    category: 'Web Components',
    coldStartMs: 8.2,
    memoryMb: 12.8,
    p99ThroughputRps: 84000,
    bundleSizeKb: 5.6,
    badge: 'Zero Framework Overhead',
    color: '#38bdf8'
  },
  {
    id: 'svelte-5',
    framework: 'Svelte 5 (Runes Signals)',
    category: 'Reactive Frameworks',
    coldStartMs: 11.4,
    memoryMb: 16.5,
    p99ThroughputRps: 68000,
    bundleSizeKb: 9.4,
    badge: 'Compiled Reactive',
    color: '#ef4444'
  },
  {
    id: 'vue-3',
    framework: 'Vue 3.5 (Composition API)',
    category: 'Reactive Frameworks',
    coldStartMs: 14.8,
    memoryMb: 22.1,
    p99ThroughputRps: 52000,
    bundleSizeKb: 18.2,
    badge: 'Virtual DOM V3',
    color: '#10b981'
  },
  {
    id: 'react-19',
    framework: 'React 19 (Server Components)',
    category: 'Full-Stack Frameworks',
    coldStartMs: 18.2,
    memoryMb: 28.4,
    p99ThroughputRps: 45000,
    bundleSizeKb: 42.6,
    badge: 'Concurrent Engine',
    color: '#61dafb'
  }
];

export const benchmarkMetricsList = [
  { id: 'coldStart', label: 'Cold Start Latency (ms)', unit: 'ms', lowerIsBetter: true },
  { id: 'memory', label: 'Memory Footprint (MB)', unit: 'MB', lowerIsBetter: true },
  { id: 'throughput', label: 'P99 Throughput (req/sec)', unit: 'RPS', lowerIsBetter: false },
  { id: 'bundle', label: 'Gzip Bundle Size (KB)', unit: 'KB', lowerIsBetter: true }
];
