import { Application } from 'express';

export const getEndpoints = (app: Application): { method: string; path: string }[] => {
  const endpoints: { method: string; path: string }[] = [];

  const extractEndpoints = (stack: any[], prefix = '') => {
    stack.forEach((layer) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods);
        methods.forEach((method) => {
          endpoints.push({
            method: method.toUpperCase(),
            path: cleanPath(prefix + layer.route.path),
          });
        });
      } else if (layer.name === 'router' && layer.handle.stack) {
        // Handle nested routers by recursively extracting endpoints
        extractEndpoints(layer.handle.stack, prefix + cleanPath(layer.regexp.toString()));
      }
    });
  };

  if (!app._router || !app._router.stack) {
    throw new Error('Router stack is undefined. Ensure routes are registered.');
  }

  extractEndpoints(app._router.stack);

  return endpoints;
};

// Helper function to clean paths
// Helper function to clean paths
const cleanPath = (path: string): string => {
  return path
    .replace(/\\|\^|\$|\?|:(?=\/|\w)/g, '') // Remove regex symbols like `\`, `^`, `$`, `?`, and `:`
    .replace(/\(\=\S+\)/g, '') // Remove patterns like `(=/|)`
    .replace(/\(\/\=\|\/\)/g, '') // Remove `(=/|)`
    .replace(/\/+/g, '/') // Replace multiple slashes (`//`) with a single `/`
    .replace(/\/$/, '') // Remove trailing `/`
    .replace(/^\//, '') // Remove leading `/`
    .replace(/^i/, '') // Remove 'i' at the start of the path (e.g., 'iuser' -> 'user')
    .replace(/i(?=\/)/g, '') // Remove 'i' if it appears before a slash (e.g., 'v1iuser' -> 'v1/user')
    .replace(/\/+/g, '/'); // Ensure there are no multiple slashes
};