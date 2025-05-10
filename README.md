# IL2CPP.Modding

A Node.js application written in TypeScript, used for injecting Frida scripts into modded games. Currently, it supports modding the `Toon Blast, Arrow Quest` Android game.

## 🚀 Installation

Clone the repository and install the dependencies:

```bash
yarn install
```

## 🛠 Development

To automatically recompile TypeScript files on changes:

```bash
yarn watch
```

To manually compile the project:

```bash
yarn build
```

## ▶️ Running the Application

After building, you can inject the script using Frida:

```bash
yarn spawn
```

## 📁 Project Structure

```plaintext
.
├── apps/
|   ├── com.template.game
|   |   ├── src/                # TypeScript source files
|   |   ├── dist/               # Compiled JavaScript output
├── core/
|   ├── helpers/
|   ├── node_modules/
├── node_modules/       # Installed dependencies
├── package.json        # Project configuration
├── tsconfig.json       # TypeScript compiler options
└── .gitignore          # Files and folders to ignore in Git
```

## 📦 Available Scripts

- `build` – Compiles TypeScript files using `build.js` and `esbuild`.
- `watch` – Runs the build script in watch mode for continuous compiling.
- `spawn` – Uses Frida to inject the compiled script (`dist/agent.js`) into the `game identifier` app on a connected device.

## 🕹️ Game Support: Toon Blast

Currently, the repository supports modding the `Toon Blast` Android game (package name: `net.peakgames.toonblast`). To mod the game, the following command will inject the compiled Frida script into the game:

```bash
yarn spawn
```

## 🕹️ Game Support: Arrow Quest

Currently, the repository supports modding the `Arrow Quest` Android game (package name: `com.Wispwood.ArrowQuest`). To mod the game, the following command will inject the compiled Frida script into the game:

```bash
yarn spawn
```

### 🛠 How it Works

- `spawn` runs the Frida tool with the provided Frida script (`dist/agent.js`) targeting the game.
- The script can interact with the game's methods and modify its behavior as required.

## 🔧 Future Game Support

This repository is designed to support multiple modded games. You can easily add new scripts or modify the existing ones to target different games by adjusting the package names and script behaviors.

## 📝 License

This project is licensed under the MIT License.