module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "10",
        },
        useBuiltIns: "usage",
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    "@babel/react",
  ],
  plugins: [
    "@babel/transform-runtime",
    "@babel/proposal-class-properties",
    "@babel/transform-async-to-generator",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          // not needed since webpack uses source
          // here only if webpack aliasing isn't wanted
          "&components": "./src/components",
          "&images": "./src/images",
          "&sass": "./src/sass",
          "#test": "./test",
        },
      },
    ],
  ],
};
