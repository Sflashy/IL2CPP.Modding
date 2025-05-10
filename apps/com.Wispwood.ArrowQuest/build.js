const esbuild = require("esbuild");

const commonOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "esnext",
  outfile: "dist/agent.js",
  format: "esm",
  sourcemap: true,
  logLevel: "info"
};

if (process.argv.includes("--watch")) {
  esbuild.context(commonOptions).then(ctx => {
    ctx.watch().then(() => console.log("👀 Watching for changes..."));
  });
} else {
  esbuild.build(commonOptions).catch(() => process.exit(1));
}
