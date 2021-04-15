function loadAppModules() {
  const packs = require.context('./app', true, /[A-Za-z0-9-_,\s]/);
  let modules = [];
  packs.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      modules = [...modules, ...packs(key).default];
    }
  });
  return modules;
}

const appModules = loadAppModules();
