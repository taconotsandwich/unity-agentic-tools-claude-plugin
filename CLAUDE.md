# CLAUDE.md

Claude Code plugin for [unity-agentic-tools](https://github.com/taconotsandwich/unity-agentic-tools). Provides hooks, skills, and plugin manifest for Unity YAML file tooling.

## Overview

This plugin integrates the `unity-agentic-tools` CLI with Claude Code via event hooks and agent skills. The CLI itself lives in a separate repository and must be installed globally (`npm install -g unity-agentic-tools`).

## Architecture

```
.claude-plugin/     Plugin manifest (plugin.json, marketplace.json)
hooks/              Event handlers (session start, prompt detection, pre/post validation)
skills/             Agent skills (CLI reference for unity-agentic-tools)
```

## Hook Architecture

| Hook | Event | Purpose |
|------|-------|---------|
| `auto_setup.js` | SessionStart | Checks for globally-installed CLI, injects install instructions if missing |
| `detect_unity.js` | UserPromptSubmit | Detects Unity file references in prompts, suggests CLI usage |
| `pre_unity_validate.js` | PreToolUse (Edit/Write) | Validates Unity YAML structure before edits |
| `post_unity_verify.js` | PostToolUse (Edit) | Verifies Unity file integrity after edits |
| `unity_context_inject.js` | PreToolUse (Read) | Suggests CLI alternatives when reading Unity files |
| `unity_docs_index.js` | SessionStart | Detects linked Unity docs and injects version info |

## Code Style

- CommonJS (`require`) for hook scripts (compatibility with bun and node)
- 4 spaces indentation
- Functions: snake_case
