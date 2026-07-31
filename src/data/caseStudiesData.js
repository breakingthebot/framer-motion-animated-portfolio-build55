// src/data/caseStudiesData.js
// Enterprise case studies accurately matching real flagship builds in the repository.
// Connects to: src/components/CaseStudyModal.jsx, src/App.jsx
// Created: 2026-07-31

export const caseStudiesList = [
  {
    id: 'cs-55',
    title: 'Framer Motion Animated Portfolio & Showcase Engine',
    subtitle: 'Build #55 — Interactive Glassmorphism Showcase with Web Audio & Layout Animations',
    category: 'Full-Stack Showcase & Web Apps',
    scaleMetrics: {
      throughput: '60 FPS',
      latency: 'Instant Render',
      availability: '100% Client-Side',
      dataVolume: '55+ Repositories'
    },
    executiveSummary: 'Engineered a production-grade portfolio application showcasing 55 daily coding builds across React 19, Vue 3, Svelte 5, Angular, and Lit Web Components. Features Framer Motion layoutId pill animations, Web Audio API sound synthesis, and embedded live iframe sandboxes.',
    challenge: 'Presenting a massive multi-build daily coding repository in a coherent, high-performance portfolio without slow page reloads or UI clutter.',
    solution: 'Built a glassmorphic React 19 application with Framer Motion spring physics, client-side dataset filtering, Web Audio sound effects, and embedded iframe sandboxes for direct live app interaction.',
    architectureNodes: [
      { id: 'app', label: 'React 19 App Root', type: 'entry' },
      { id: 'motion', label: 'Framer Motion AnimatePresence', type: 'gateway' },
      { id: 'sfx', label: 'Web Audio API Synthesizer (soundFX.js)', type: 'service' },
      { id: 'palette', label: 'Cmd+K Command Palette Navigator', type: 'bus' },
      { id: 'dataset', label: 'Extracted Builds Metadata (55 Builds)', type: 'db' }
    ],
    techStack: ['React 19', 'Framer Motion', 'Vite', 'Web Audio API', 'Lucide Icons', 'Vanilla CSS'],
    codeHighlight: `// Framer Motion Spring Layout Pill Animation & Web Audio SFX
<button
  key={link.id}
  className={\`nav-link-btn \${isActive ? 'active' : ''}\`}
  onClick={() => {
    playTabSound();
    setActiveSection(link.id);
  }}
>
  <Icon size={16} />
  <span>{link.label}</span>
  {isActive && (
    <motion.div
      className="active-pill"
      layoutId="activePill"
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  )}
</button>`,
    demoUrl: 'https://framer-motion-animated-portfolio-build55.vercel.app',
    githubUrl: 'https://github.com/breakingthebot/framer-motion-animated-portfolio-build55'
  },
  {
    id: 'cs-54',
    title: 'Styled Components Theme-able UI Kit',
    subtitle: 'Build #54 — Standalone React Component Library with Dynamic CSS-in-JS Themes',
    category: 'UI Libraries & Design Systems',
    scaleMetrics: {
      throughput: '100% Theme Isolation',
      latency: '< 5ms Theme Switch',
      availability: '100% Accessible',
      dataVolume: '15+ Components'
    },
    executiveSummary: 'Engineered a production-grade React UI Component Library using styled-components (CSS-in-JS) with dynamic ThemeProvider switching (Cyberpunk, Neon, Solarized). Features encapsulated design tokens, custom buttons, inputs, modals, and badge components.',
    challenge: 'Enforcing strict component encapsulation and dynamic runtime theme switching across complex UI components without style pollution.',
    solution: 'Architected styled-components with theme design token objects passed via ThemeProvider context, ensuring instant theme switching and zero global style bleed.',
    architectureNodes: [
      { id: 'provider', label: 'styled-components ThemeProvider', type: 'entry' },
      { id: 'tokens', label: 'Theme Tokens (Cyber, Neon, Solar)', type: 'gateway' },
      { id: 'components', label: 'Encapsulated UI Components', type: 'service' },
      { id: 'playground', label: 'Interactive UI Kit Showcase', type: 'bus' },
      { id: 'bundle', label: 'Vite Production Bundle', type: 'db' }
    ],
    techStack: ['React 19', 'styled-components', 'Vite', 'CSS-in-JS', 'JavaScript (ES6+)'],
    codeHighlight: `// Encapsulated styled-components Button with Dynamic Theme Props
import styled from 'styled-components';

export const StyledButton = styled.button\`
  background: \${props => props.theme.colors.primary};
  color: \${props => props.theme.colors.buttonText};
  border: 1px solid \${props => props.theme.colors.border};
  padding: 0.6rem 1.2rem;
  border-radius: \${props => props.theme.borderRadius};
  font-weight: 700;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 15px \${props => props.theme.colors.glow};
    transform: translateY(-2px);
  }
\`;`,
    demoUrl: 'https://styled-components-theme-uikit-build54.vercel.app',
    githubUrl: 'https://github.com/breakingthebot/styled-components-theme-uikit-build54'
  },
  {
    id: 'cs-52',
    title: 'ApexAdmin — Enterprise Tailwind CSS Admin Dashboard',
    subtitle: 'Build #52 — Responsive Utility-First Admin Dashboard & Analytics Widgets',
    category: 'UI Libraries & Design Systems',
    scaleMetrics: {
      throughput: '100% Responsive',
      latency: 'Zero Runtime JS',
      availability: '100% Utility-First',
      dataVolume: '8+ Dashboard Views'
    },
    executiveSummary: 'Engineered an enterprise-grade Tailwind CSS Admin Dashboard featuring dark mode theme toggles, data visualization widgets, user analytics tables, activity streams, and responsive sidebar navigation layout.',
    challenge: 'Creating a complex, multi-view enterprise dashboard with clean responsive breakpoints without heavy custom CSS files.',
    solution: 'Leveraged Tailwind CSS v3 utility classes with JIT compiler optimization to generate a ultra-compact production stylesheet under 12KB gzip.',
    architectureNodes: [
      { id: 'layout', label: 'Tailwind CSS Grid/Flex Layout', type: 'entry' },
      { id: 'sidebar', label: 'Collapsible Responsive Sidebar', type: 'gateway' },
      { id: 'widgets', label: 'Analytics & Revenue Widgets', type: 'service' },
      { id: 'theme', label: 'Dark Mode Class Strategy', type: 'bus' },
      { id: 'jit', label: 'Tailwind JIT Purged Output', type: 'db' }
    ],
    techStack: ['TailwindCSS v3', 'HTML5', 'Vanilla JavaScript', 'Vite', 'Lucide Icons'],
    codeHighlight: `<!-- Tailwind CSS Utility-First Responsive Stat Card -->
<div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 shadow-xl">
  <div class="flex items-center justify-between">
    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
    <span class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold">+18.4%</span>
  </div>
  <div class="mt-4 text-3xl font-black text-white">$124,850.00</div>
</div>`,
    demoUrl: 'https://tailwind-admin-dashboard-build52.vercel.app',
    githubUrl: 'https://github.com/breakingthebot/tailwind-admin-dashboard-build52'
  }
];
