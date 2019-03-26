const RUN_MODE = {
  WORKER: 0,
  IFRAME: 1,
  AUTO: 2
};
const workerTemplate = `"use strict";
self.onmessage = (event) => {
  const {type, sandbox} = event.data;
  if (type === 'eval') {
    if (sandbox) {
      for (let prop in sandbox) {
        if (sandbox.hasOwnProperty(prop)) {
          self[prop] = sandbox[prop];
        }
      }
    }
    try {
      const res = eval(event.data.code);
      self.postMessage({
        type: 'eval',
        data: res
      })
    } catch (err) {
      self.postMessage({
        type: 'error',
        message: err.message
      })
    }
  }
};`;

/**
 * Run JavaScript code with `eval()` in a new web worker.
 * @param {string} code
 * @param {Object} sandbox
 */
function runInNewWorker(code, sandbox) {
  return new Promise((resolve, reject) => {
    const workerTemplateBlob = new Blob([workerTemplate], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(workerTemplateBlob));
    worker.onmessage = (event) => {
      const { type, data, message } = event.data;
      if (type === 'eval') {
        resolve(data);
      } else if (type === 'error') {
        reject(new Error(message));
      }
      worker.terminate();
    };
    worker.onerror = (event) => {
      reject(new Error(event.message));
      worker.terminate();
    };
    worker.postMessage({
      type: 'eval',
      code,
      sandbox
    });
  });
}

/**
 * Run JavaScript code with `eval()` in a new iframe.
 * @param {string} code
 * @param {Object} sandbox
 */
function runInNewIframe(code, sandbox) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const newWindow = iframe.contentWindow;
    if (sandbox) {
      for (let prop in sandbox) {
        if (sandbox.hasOwnProperty(prop)) {
          newWindow[prop] = sandbox[prop];
        }
      }
    }
    try {
      const res = newWindow.eval(code);
      resolve(res);
    } catch (err) {
      reject(err);
    }
    document.body.removeChild(iframe);
  });
}

/**
 * Run JavaScript code with `eval()` in a context.
 * @param {string} code
 * @param {Object} sandbox
 * @param {Object} options
 */
function runInNewContext(code, sandbox, options = {}) {
  switch (options.mode) {
    case RUN_MODE.IFRAME:
      return runInNewIframe(code, sandbox);
    case RUN_MODE.WORKER:
      return runInNewWorker(code, sandbox);
    default:
      if (typeof Worker !== 'undefined') {
        return runInNewWorker(code, sandbox);
      } else if (typeof document !== 'undefined') {
        return runInNewIframe(code, sandbox);
      } else {
        return Promise.reject(new Error('Not supported'));
      }
  }
}

export {
  runInNewContext,
  runInNewIframe,
  runInNewWorker
};
