export type Tier = 'must' | 'rec' | 'opt';

export interface Package {
  name: string;
  description: string;
  category: string;
  tier: Tier;
  stackTags: string[];
  npmUrl: string;
  weeklyDownloads?: number | null;
}

export interface StackSelection {
  frontend: string;
  backend: string;
  database: string;
  auth: string;
}

export const INITIAL_PACKAGES: Package[] = [
  // UI / UX & Styling
  {
    name: 'lucide-react',
    description: 'Beautiful & consistent icon toolkit made by the community.',
    category: 'Icons',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/lucide-react',
  },
  {
    name: 'radix-ui',
    description: 'An open-source UI component library for building high-quality, accessible design systems and web apps.',
    category: 'UI Components',
    tier: 'must',
    stackTags: ['react', 'nextjs'],
    npmUrl: 'https://www.npmjs.com/package/@radix-ui/react-primitive',
  },
  {
    name: '@headlessui/react',
    description: 'A set of completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.',
    category: 'UI Components',
    tier: 'rec',
    stackTags: ['react', 'nextjs', 'vue'],
    npmUrl: 'https://www.npmjs.com/package/@headlessui/react',
  },
  {
    name: 'framer-motion',
    description: 'An open source motion library for React, made by Framer.',
    category: 'Animations',
    tier: 'rec',
    stackTags: ['react', 'nextjs', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/framer-motion',
  },
  {
    name: 'clsx',
    description: 'A tiny utility for constructing className strings conditionally.',
    category: 'Styling Utilities',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'vue', 'svelte', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/clsx',
  },
  {
    name: 'tailwind-merge',
    description: 'Merge Tailwind CSS classes without style conflicts.',
    category: 'Styling Utilities',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'vue', 'svelte', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/tailwind-merge',
  },
  {
    name: 'styled-components',
    description: 'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps.',
    category: 'Styling',
    tier: 'opt',
    stackTags: ['react'],
    npmUrl: 'https://www.npmjs.com/package/styled-components',
  },
  
  // State Management
  {
    name: 'zustand',
    description: 'A small, fast and scalable bearbones state-management solution.',
    category: 'State Management',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/zustand',
  },
  {
    name: 'jotai',
    description: 'Primitive and flexible state management for React.',
    category: 'State Management',
    tier: 'rec',
    stackTags: ['react', 'nextjs'],
    npmUrl: 'https://www.npmjs.com/package/jotai',
  },
  {
    name: '@reduxjs/toolkit',
    description: 'The official, opinionated, batteries-included toolset for efficient Redux development.',
    category: 'State Management',
    tier: 'opt',
    stackTags: ['react', 'nextjs'],
    npmUrl: 'https://www.npmjs.com/package/@reduxjs/toolkit',
  },

  // Forms
  {
    name: 'react-hook-form',
    description: 'Performant, flexible and extensible forms with easy-to-use validation.',
    category: 'Forms',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/react-hook-form',
  },
  {
    name: 'zod',
    description: 'TypeScript-first schema validation with static type inference.',
    category: 'Validation',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'nodejs', 'express', 'fastify', 'nestjs', 'hono'],
    npmUrl: 'https://www.npmjs.com/package/zod',
  },

  // Data Fetching
  {
    name: '@tanstack/react-query',
    description: 'Powerful asynchronous state management for TS/JS, React, Solid, Vue and Svelte.',
    category: 'Data Fetching',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'remix', 'svelte', 'vue'],
    npmUrl: 'https://www.npmjs.com/package/@tanstack/react-query',
  },
  {
    name: 'axios',
    description: 'Promise based HTTP client for the browser and node.js.',
    category: 'Data Fetching',
    tier: 'rec',
    stackTags: ['react', 'nextjs', 'nodejs', 'express', 'fastify', 'nestjs', 'hono'],
    npmUrl: 'https://www.npmjs.com/package/axios',
  },

  // Testing
  {
    name: 'vitest',
    description: 'A blazing fast unit test framework powered by Vite.',
    category: 'Testing',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'vue', 'svelte', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/vitest',
  },
  {
    name: '@testing-library/react',
    description: 'Simple and complete React DOM testing utilities that encourage good testing practices.',
    category: 'Testing',
    tier: 'must',
    stackTags: ['react', 'nextjs', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/@testing-library/react',
  },
  {
    name: 'playwright',
    description: 'Fast and reliable end-to-end testing for modern web apps.',
    category: 'Testing',
    tier: 'rec',
    stackTags: ['react', 'nextjs', 'vue', 'svelte', 'remix'],
    npmUrl: 'https://www.npmjs.com/package/playwright',
  },

  // Database / ORM
  {
    name: 'prisma',
    description: 'Next-generation Node.js and TypeScript ORM.',
    category: 'Database',
    tier: 'must',
    stackTags: ['prisma', 'nodejs', 'nextjs'],
    npmUrl: 'https://www.npmjs.com/package/prisma',
  },
  {
    name: 'drizzle-orm',
    description: 'TypeScript ORM that feels like SQL.',
    category: 'Database',
    tier: 'must',
    stackTags: ['drizzle', 'nodejs', 'nextjs', 'hono'],
    npmUrl: 'https://www.npmjs.com/package/drizzle-orm',
  },
  {
    name: 'mongoose',
    description: 'MongoDB object modeling tool designed to work in an asynchronous environment.',
    category: 'Database',
    tier: 'must',
    stackTags: ['mongoose', 'nodejs', 'express', 'fastify'],
    npmUrl: 'https://www.npmjs.com/package/mongoose',
  },

  // Utilities
  {
    name: 'date-fns',
    description: 'Modern JavaScript date utility library.',
    category: 'Utilities',
    tier: 'rec',
    stackTags: ['react', 'nextjs', 'nodejs', 'vue', 'svelte'],
    npmUrl: 'https://www.npmjs.com/package/date-fns',
  },
  {
    name: 'lodash',
    description: 'A modern JavaScript utility library delivering modularity, performance & extras.',
    category: 'Utilities',
    tier: 'opt',
    stackTags: ['react', 'nextjs', 'nodejs', 'vue', 'svelte'],
    npmUrl: 'https://www.npmjs.com/package/lodash',
  },

  // Auth
  {
    name: 'next-auth',
    description: 'Authentication for Next.js.',
    category: 'Auth',
    tier: 'must',
    stackTags: ['nextjs', 'auth'],
    npmUrl: 'https://www.npmjs.com/package/next-auth',
  },
  {
    name: '@clerk/nextjs',
    description: 'Clerk SDK for Next.js.',
    category: 'Auth',
    tier: 'rec',
    stackTags: ['nextjs', 'auth'],
    npmUrl: 'https://www.npmjs.com/package/@clerk/nextjs',
  },
  {
    name: 'lucia',
    description: 'Authentication library for your tech stack.',
    category: 'Auth',
    tier: 'must',
    stackTags: ['lucia', 'nodejs', 'hono', 'nextjs'],
    npmUrl: 'https://www.npmjs.com/package/lucia',
  }
];

export function getPackagesForStack(stacks: string[]): Package[] {
  const normalizedStacks = stacks.map(s => s.toLowerCase());
  
  return INITIAL_PACKAGES.filter(pkg => 
    pkg.stackTags.some(tag => normalizedStacks.includes(tag.toLowerCase())) ||
    normalizedStacks.includes(pkg.category.toLowerCase())
  );
}
