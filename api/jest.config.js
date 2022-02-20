module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
