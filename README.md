# Pretty CLI

**Pretty CLI** is a command-line tool to install [prettylab](https://github.com/prettylab) modules into your repository.

It fetches the module catalog from [`pretty.onhq.pl/modules.json`](https://pretty.onhq.pl/modules.json), lets you pick which ones you want, writes a `pretty.json` manifest, and pulls each selected module into a `prettylab/` folder via `git subtree`.

---

## Installation

```bash
npm install -g @prettylab/cli
```

---

## Usage

### `pretty`

```bash
pretty
```

Shows usage and the list of available commands.

---

### `pretty init`

```bash
pretty init
```

Fetches the module catalog from `pretty.onhq.pl/modules.json`, opens an interactive menu so you can pick which modules to install, creates a `pretty.json` file in the repository root, and pulls each selected module into the `prettylab/` folder.

Run this once per project to bootstrap.

---

### `pretty install`

```bash
pretty install
```

Fetches the module catalog, shows a menu of modules that are not yet installed, adds the selected ones to `pretty.json`, and pulls them into the `prettylab/` folder.

Use this to add more modules to an existing project.

---

### `pretty pull <module>`

```bash
pretty pull core
```

Stashes any uncommitted changes in the repo, runs `git subtree pull` for the module (honoring a `lockedAt` commit if set), restores the stash, and prints how many commits were brought in.

---

### `pretty push <module>`

```bash
pretty push core
```

Stages everything under the module's folder, prompts for a commit message, creates the commit, and pushes it back upstream with `git subtree push`. Refuses to run if the module is locked.

---

### `pretty lock <module> [commit]`

```bash
pretty lock core
pretty lock core 1a2b3c4
```

Pins the module to a specific remote commit. If no commit is provided, it resolves the current tip of the module's branch and locks to that SHA. Future `pretty pull` runs stop at the locked commit.

---

### `pretty unlock <module>`

```bash
pretty unlock core
```

Removes the lock so the module follows its configured branch again.

---

## Configuration

`pretty.json` lives in the root of your repository and tracks the installed modules:

```json
{
  "modules": {
    "example": {
      "remote": "https://github.com/prettylab/example.git",
      "branch": "main",
      "prefix": "prettylab/example",
      "lockedAt": "1a2b3c4d5e6f..."
    }
  },
  "defaultBranch": "main"
}
```

Modules are pulled with `git subtree`, so the source ends up committed under `prettylab/<module>` in your repo.

---

## License

MIT © PrettyLab
