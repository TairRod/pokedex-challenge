module.exports = {
  '*.{js,jsx,ts,tsx}': (files) => {
    const sourceFiles = files.filter((file) => !file.endsWith('.prettierrc.js'));

    if (sourceFiles.length === 0) {
      return [];
    }

    return [`eslint --fix ${sourceFiles.map((file) => JSON.stringify(file)).join(' ')}`];
  },
  '*.{js,jsx,ts,tsx,json,md,yml,yaml}': 'prettier --write',
};
