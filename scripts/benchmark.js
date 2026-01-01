#!/usr/bin/env node

/**
 * Performance benchmark script for Codeshine
 */

import { performance } from 'perf_hooks';

// Dynamic import for ESM
const runBenchmarks = async () => {
  const { highlight, Codeshine } = await import('../dist/esm/index.js');
  const { themes } = await import('../dist/esm/themes/index.js');

  console.log('\n========================================');
  console.log('  Codeshine Performance Benchmarks');
  console.log('========================================\n');

  // Test code samples
  const samples = {
    small: `const x = 1;`,

    medium: `
import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
    `.trim(),

    large: Array(100)
      .fill(`
function processData(data) {
  // Process each item
  return data.map(item => {
    const result = transform(item);
    console.log('Processed:', result);
    return result;
  });
}
      `.trim())
      .join('\n\n'),
  };

  // Benchmark function
  function benchmark(name, fn, iterations = 100) {
    // Warmup
    for (let i = 0; i < 10; i++) fn();

    // Measure
    const times = [];
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      fn();
      times.push(performance.now() - start);
    }

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    const p95 = times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)];

    return { name, avg, min, max, p95, iterations };
  }

  // Run benchmarks
  const results = [];

  // 1. Small code highlighting
  results.push(
    benchmark('Small code (12 chars)', () => {
      highlight(samples.small, { language: 'javascript' });
    })
  );

  // 2. Medium code highlighting
  results.push(
    benchmark('Medium code (~800 chars)', () => {
      highlight(samples.medium, { language: 'typescript' });
    })
  );

  // 3. Large code highlighting
  results.push(
    benchmark(
      'Large code (~15KB)',
      () => {
        highlight(samples.large, { language: 'javascript' });
      },
      20
    )
  );

  // 4. With line numbers
  results.push(
    benchmark('Medium + line numbers', () => {
      highlight(samples.medium, {
        language: 'typescript',
        lineNumbers: true,
      });
    })
  );

  // 5. With all options
  results.push(
    benchmark('Medium + all options', () => {
      highlight(samples.medium, {
        language: 'typescript',
        lineNumbers: true,
        highlightLines: [1, 5, 10],
        copyButton: true,
        showLanguageBadge: true,
      });
    })
  );

  // 6. Different themes
  results.push(
    benchmark('Theme: Dracula', () => {
      highlight(samples.medium, {
        language: 'typescript',
        theme: themes.dracula,
      });
    })
  );

  // 7. Codeshine class instance
  const codeshine = new Codeshine({ theme: themes.githubDark });
  results.push(
    benchmark('Codeshine class', () => {
      codeshine.highlight(samples.medium, { language: 'typescript' });
    })
  );

  // Print results
  console.log('Results:\n');
  console.log(
    '| Benchmark | Avg | Min | Max | p95 | Ops/sec |'
  );
  console.log(
    '|-----------|-----|-----|-----|-----|---------|'
  );

  for (const r of results) {
    const opsPerSec = Math.round(1000 / r.avg);
    console.log(
      `| ${r.name.padEnd(25)} | ${r.avg.toFixed(2).padStart(6)}ms | ${r.min.toFixed(2).padStart(6)}ms | ${r.max.toFixed(2).padStart(6)}ms | ${r.p95.toFixed(2).padStart(6)}ms | ${opsPerSec.toString().padStart(7)} |`
    );
  }

  // Memory usage
  console.log('\n----------------------------------------');
  console.log('Memory Usage:');
  const used = process.memoryUsage();
  console.log(`  Heap Used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
  console.log(`  Heap Total: ${Math.round(used.heapTotal / 1024 / 1024)} MB`);
  console.log(`  RSS: ${Math.round(used.rss / 1024 / 1024)} MB`);

  // Throughput test
  console.log('\n----------------------------------------');
  console.log('Throughput Test (1 second):');

  let count = 0;
  const endTime = performance.now() + 1000;
  while (performance.now() < endTime) {
    highlight(samples.medium, { language: 'typescript' });
    count++;
  }
  console.log(`  Highlights per second: ${count}`);
  console.log(`  Characters per second: ${count * samples.medium.length}`);

  console.log('\n========================================\n');
};

runBenchmarks().catch(console.error);
