'use client';

import { useEffect, useRef } from 'react';
import {
  createBenchmark,
  measureWebVitals,
  measureComponentRender,
  getBenchmark,
  addMetric,
} from '@/utils/performance-benchmarks';

/**
 * Options for the usePerformance hook
 */
interface UsePerformanceOptions {
  /** Benchmark ID to use */
  benchmarkId: string;
  /** Name of the benchmark */
  benchmarkName?: string;
  /** Description of the benchmark */
  benchmarkDescription?: string;
  /** Whether to measure web vitals */
  measureWebVitals?: boolean;
  /** Whether to measure component render time */
  measureRender?: boolean;
  /** Component name for render time measurement */
  componentName?: string;
  /** Custom metrics to measure */
  customMetrics?: Array<{
    name: string;
    measure: () => number;
    unit?: string;
  }>;
}

/**
 * Hook for measuring performance in React components
 */
export function usePerformance({
  benchmarkId,
  benchmarkName = 'Component Performance',
  benchmarkDescription = 'Performance metrics for React components',
  measureWebVitals: shouldMeasureWebVitals = false,
  measureRender: shouldMeasureRender = true,
  componentName,
  customMetrics = [],
}: UsePerformanceOptions) {
  // Store render start time
  const renderStartTime = useRef(performance.now());
  
  // Initialize benchmark
  useEffect(() => {
    // Skip if not in browser
    if (typeof window === 'undefined') return;
    
    // Create benchmark if it doesn't exist
    const benchmark = getBenchmark(benchmarkId);
    if (!benchmark) {
      createBenchmark(benchmarkId, benchmarkName, benchmarkDescription);
    }
    
    // Measure web vitals if enabled
    if (shouldMeasureWebVitals) {
      measureWebVitals(benchmarkId);
    }
    
    // Measure render time if enabled
    if (shouldMeasureRender && componentName) {
      measureComponentRender(benchmarkId, componentName, renderStartTime.current);
    }
    
    // Measure custom metrics
    customMetrics.forEach(metric => {
      addMetric(benchmarkId, {
        name: metric.name,
        type: 'custom',
        value: metric.measure(),
        unit: metric.unit || 'ms',
        source: componentName,
      });
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  /**
   * Measure a custom metric
   */
  const measureCustomMetric = (name: string, value: number, unit = 'ms') => {
    addMetric(benchmarkId, {
      name,
      type: 'custom',
      value,
      unit,
      source: componentName,
    });
  };
  
  /**
   * Measure time taken by a function
   */
  const measureFunction = <T extends (...args: any[]) => any>(
    name: string,
    fn: T,
    ...args: Parameters<T>
  ): ReturnType<T> => {
    const startTime = performance.now();
    const result = fn(...args);
    const endTime = performance.now();
    
    measureCustomMetric(name, endTime - startTime);
    
    return result;
  };
  
  /**
   * Measure time taken by an async function
   */
  const measureAsyncFunction = async <T extends (...args: any[]) => Promise<any>>(
    name: string,
    fn: T,
    ...args: Parameters<T>
  ): Promise<ReturnType<T>> => {
    const startTime = performance.now();
    const result = await fn(...args);
    const endTime = performance.now();
    
    measureCustomMetric(name, endTime - startTime);
    
    return result;
  };
  
  return {
    measureCustomMetric,
    measureFunction,
    measureAsyncFunction,
  };
}
