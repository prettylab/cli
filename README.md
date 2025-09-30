# Pretty CLI

**Pretty CLI** is a command-line tool to install, configure, and manage [prettylab](https://github.com/prettylab) dependencies inside your repositories.  
It helps you initialize configuration, add and sync modules, and keep everything up to date.

---

## 📦 Installation

```bash
npm install -g @prettylab/cli
```

Or use directly via `npx`:

```bash
npx pretty <command>
```

---

## 🚀 Usage

The CLI exposes several subcommands to manage your project:

### `pretty`
```bash
pretty
```
Main entrypoint for the tool. Shows help and available commands.  

**Description:** Command-line tool to install and update PrettyLab dependencies.

---

### `pretty add <module>`
```bash
pretty add <module>
```
**Description:** Add a module into the current repo.

---

### `pretty init`
```bash
pretty init
```
**Description:** Create a `pretty.json` interactively in this repo.

---

### `pretty list`
```bash
pretty list
```
**Description:** List configured modules.

---

### `pretty pull <module>`
```bash
pretty pull <module>
```
**Description:** Pull latest changes for a module into this repo.

---

### `pretty push <module>`
```bash
pretty push <module>
```
**Description:** Push local changes back to the module upstream.

---

### `pretty set <module>`
```bash
pretty set <module>
```
**Description:** Add or update a module in `.pretty.json`.

---

### `pretty status`
```bash
pretty status
```
**Description:** Show dirty/ahead/behind state for all modules (or a specific one with `--module`).

---

### `pretty sync`
```bash
pretty sync
```
**Description:** Pull all modules; optionally push those with local commits ahead of upstream.

---

## ⚙️ Configuration

The CLI relies on a configuration file (default: `.pretty.json`) stored in the root of your repository.  
This file defines which modules are installed and how they are linked.

Run:

```bash
pretty init
```

to generate one interactively.

---

## 📝 Example Workflow

```bash
# Initialize repo
pretty init

# Add a module
pretty add ui-kit

# Pull latest updates
pretty pull ui-kit

# Push local changes
pretty push ui-kit

# Sync all modules
pretty sync

# Check current status
pretty status
```

---

## 🛠 Development

Clone the repo and build:

```bash
git clone https://github.com/pretty/pretty-cli.git
cd pretty-cli
pnpm install
pnpm build
```

Now you can run:

```bash
pretty <command>
```

---

## 📖 License

MIT © PrettyLab
