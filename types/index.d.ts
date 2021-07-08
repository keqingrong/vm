/**
 * Run JavaScript code with `eval()` in a new iframe.
 */
export function runInNewIframe<T>(
  code: string,
  sandbox?: Record<string, any>
): Promise<T>;

/**
 * Run JavaScript code with `eval()` in a new web worker.
 */
export function runInNewWorker<T>(
  code: string,
  sandbox?: Record<string, any>
): Promise<T>;

interface Options {
  /**
   * Mode
   * - WORKER: 0
   * - IFRAME: 1
   * - AUTO: 2
   */
  mode: 0 | 1 | 2;
}

/**
 * Run JavaScript code with `eval()` in a context.
 */
export function runInNewContext<T>(
  code: string,
  sandbox?: Record<string, any>,
  options?: Options
): Promise<T>;
