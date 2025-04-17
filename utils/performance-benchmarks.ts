/**
 * Performance benchmarking utilities
 * Used to measure and track performance metrics for the application
 */

/**
 * Performance metric types
 */
export type PerformanceMetricType = 
  | 'FCP' // First Contentful Paint
  | 'LCP' // Largest Contentful Paint
  | 'FID' // First Input Delay
  | 'CLS' // Cumulative Layout Shift
  | 'TTFB' // Time to First Byte
  | 'TTI' // Time to Interactive
  | 'TBT' // Total Blocking Time
  | 'custom'; // Custom metric

/**
 * Performance metric data
 */
export interface PerformanceMetric {
  /** Name of the metric */
  name: string;
  /** Type of metric */
  type: PerformanceMetricType;
  /** Value of the metric */
  value: number;
  /** Unit of measurement (ms, score, etc.) */
  unit: string;
  /** Timestamp when the metric was recorded */
  timestamp: number;
  /** URL or component where the metric was recorded */
  source?: string;
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Performance benchmark data
 */
export interface PerformanceBenchmark {
  /** Unique identifier for the benchmark */
  id: string;
  /** Name of the benchmark */
  name: string;
  /** Description of what is being measured */
  description: string;
  /** Metrics collected for this benchmark */
  metrics: PerformanceMetric[];
  /** When the benchmark was created */
  createdAt: number;
  /** When the benchmark was last updated */
  updatedAt: number;
}

/**
 * Storage key for benchmarks in localStorage
 */
const BENCHMARK_STORAGE_KEY = 'performance_benchmarks';

/**
 * Get all stored benchmarks
 */
export function getBenchmarks(): PerformanceBenchmark[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedData = localStorage.getItem(BENCHMARK_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Failed to retrieve benchmarks:', error);
    return [];
  }
}

/**
 * Save benchmarks to storage
 */
function saveBenchmarks(benchmarks: PerformanceBenchmark[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(BENCHMARK_STORAGE_KEY, JSON.stringify(benchmarks));
  } catch (error) {
    console.error('Failed to save benchmarks:', error);
  }
}

/**
 * Create a new benchmark
 */
export function createBenchmark(
  id: string,
  name: string,
  description: string
): PerformanceBenchmark {
  const now = Date.now();
  const benchmark: PerformanceBenchmark = {
    id,
    name,
    description,
    metrics: [],
    createdAt: now,
    updatedAt: now,
  };
  
  // Save to storage
  const benchmarks = getBenchmarks();
  saveBenchmarks([...benchmarks, benchmark]);
  
  return benchmark;
}

/**
 * Get a benchmark by ID
 */
export function getBenchmark(id: string): PerformanceBenchmark | undefined {
  const benchmarks = getBenchmarks();
  return benchmarks.find(b => b.id === id);
}

/**
 * Add a metric to a benchmark
 */
export function addMetric(
  benchmarkId: string,
  metric: Omit<PerformanceMetric, 'timestamp'>
): PerformanceBenchmark | undefined {
  const benchmarks = getBenchmarks();
  const benchmarkIndex = benchmarks.findIndex(b => b.id === benchmarkId);
  
  if (benchmarkIndex === -1) {
    console.error(`Benchmark with ID ${benchmarkId} not found`);
    return undefined;
  }
  
  const benchmark = benchmarks[benchmarkIndex];
  const updatedBenchmark: PerformanceBenchmark = {
    ...benchmark,
    metrics: [
      ...benchmark.metrics,
      {
        ...metric,
        timestamp: Date.now(),
      },
    ],
    updatedAt: Date.now(),
  };
  
  benchmarks[benchmarkIndex] = updatedBenchmark;
  saveBenchmarks(benchmarks);
  
  return updatedBenchmark;
}

/**
 * Measure web vitals metrics
 */
export function measureWebVitals(benchmarkId: string): void {
  if (typeof window === 'undefined') return;
  
  // Ensure the benchmark exists
  let benchmark = getBenchmark(benchmarkId);
  if (!benchmark) {
    benchmark = createBenchmark(
      benchmarkId,
      'Web Vitals',
      'Core Web Vitals metrics'
    );
  }
  
  // Measure FCP (First Contentful Paint)
  const fcpEntry = performance.getEntriesByName('first-contentful-paint');
  if (fcpEntry.length > 0) {
    addMetric(benchmarkId, {
      name: 'First Contentful Paint',
      type: 'FCP',
      value: fcpEntry[0].startTime,
      unit: 'ms',
      source: window.location.pathname,
    });
  }
  
  // Use PerformanceObserver to capture LCP
  if ('PerformanceObserver' in window) {
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      addMetric(benchmarkId, {
        name: 'Largest Contentful Paint',
        type: 'LCP',
        value: lastEntry.startTime,
        unit: 'ms',
        source: window.location.pathname,
      });
    });
    
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('LCP observation failed:', e);
    }
    
    // CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      
      addMetric(benchmarkId, {
        name: 'Cumulative Layout Shift',
        type: 'CLS',
        value: clsValue,
        unit: 'score',
        source: window.location.pathname,
      });
    });
    
    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('CLS observation failed:', e);
    }
    
    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        addMetric(benchmarkId, {
          name: 'First Input Delay',
          type: 'FID',
          value: (entry as any).processingStart - (entry as any).startTime,
          unit: 'ms',
          source: window.location.pathname,
        });
      }
    });
    
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('FID observation failed:', e);
    }
  }
  
  // TTFB (Time to First Byte)
  const navigationEntries = performance.getEntriesByType('navigation');
  if (navigationEntries.length > 0) {
    const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
    
    addMetric(benchmarkId, {
      name: 'Time to First Byte',
      type: 'TTFB',
      value: navEntry.responseStart,
      unit: 'ms',
      source: window.location.pathname,
    });
  }
}

/**
 * Measure component render time
 */
export function measureComponentRender(
  benchmarkId: string,
  componentName: string,
  startTime: number
): void {
  const endTime = performance.now();
  const renderTime = endTime - startTime;
  
  addMetric(benchmarkId, {
    name: `${componentName} Render Time`,
    type: 'custom',
    value: renderTime,
    unit: 'ms',
    source: componentName,
    metadata: {
      component: componentName,
    },
  });
}

/**
 * Compare benchmarks to see performance improvements
 */
export function compareBenchmarks(
  beforeId: string,
  afterId: string
): Record<string, { before: number; after: number; improvement: number }> {
  const beforeBenchmark = getBenchmark(beforeId);
  const afterBenchmark = getBenchmark(afterId);
  
  if (!beforeBenchmark || !afterBenchmark) {
    console.error('One or both benchmarks not found');
    return {};
  }
  
  const results: Record<string, { before: number; after: number; improvement: number }> = {};
  
  // Group metrics by name
  const beforeMetrics = groupBy(beforeBenchmark.metrics, 'name');
  const afterMetrics = groupBy(afterBenchmark.metrics, 'name');
  
  // Get all unique metric names
  const metricNames = Array.from(new Set([
    ...Object.keys(beforeMetrics),
    ...Object.keys(afterMetrics),
  ]));
  
  // Compare each metric
  for (const name of metricNames) {
    const beforeValues = beforeMetrics[name]?.map(m => m.value) || [];
    const afterValues = afterMetrics[name]?.map(m => m.value) || [];
    
    if (beforeValues.length === 0 || afterValues.length === 0) {
      continue;
    }
    
    // Calculate average values
    const beforeAvg = average(beforeValues);
    const afterAvg = average(afterValues);
    
    // Calculate improvement percentage
    // Note: For some metrics like CLS, lower is better
    // For others like FCP, LCP, FID, lower is also better
    const improvement = ((beforeAvg - afterAvg) / beforeAvg) * 100;
    
    results[name] = {
      before: beforeAvg,
      after: afterAvg,
      improvement,
    };
  }
  
  return results;
}

/**
 * Helper function to group array items by a key
 */
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Helper function to calculate average of an array of numbers
 */
function average(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
