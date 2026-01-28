// src/modules/ModuleRegistry.js

// Registry to manage future modules/tools
const modules = {};

export const registerModule = (name, module) => {
  if (!modules[name]) {
    modules[name] = module;
  }
};

export const getModule = (name) => modules[name];

export const listModules = () => Object.keys(modules);
