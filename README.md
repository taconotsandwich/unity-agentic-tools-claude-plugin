# Unity Agentic Tools - Claude Code Plugin

A Claude Code plugin that integrates the [unity-agentic-tools](https://github.com/taconotsandwich/unity-agentic-tools) CLI for token-efficient parsing, analysis, and editing of Unity YAML files (.unity, .prefab, .asset).

## Prerequisites

Install the `unity-agentic-tools` CLI from source:

```bash
git clone https://github.com/taconotsandwich/unity-agentic-tools.git
cd unity-agentic-tools
bun install
bun run build
cd unity-agentic-tools && npm link
```

Verify installation:
```bash
unity-agentic-tools --version
```

## Installation

### From GitHub

```bash
claude plugin add github:taconotsandwich/unity-agentic-tools-claude-plugin
```

### From Local Clone

```bash
git clone git@github.com:taconotsandwich/unity-agentic-tools-claude-plugin.git
claude plugin add ./unity-agentic-tools-claude-plugin
```

### For Development

```bash
claude --plugin-dir ./unity-agentic-tools-claude-plugin
```

## What This Plugin Does

### Hooks

| Hook | Trigger | Description |
|------|---------|-------------|
| **auto_setup** | Session start | Verifies the CLI is installed; shows install instructions if missing |
| **detect_unity** | Every prompt | Detects Unity file references and suggests using CLI commands |
| **pre_unity_validate** | Before Edit/Write | Validates Unity YAML structure before modifications |
| **post_unity_verify** | After Edit | Checks file integrity after edits (warnings only) |
| **unity_context_inject** | Before Read | Suggests CLI alternatives when reading Unity files raw |
| **unity_docs_index** | Session start | Detects linked Unity documentation and version |

### Skills

The `unity-agentic-tools` skill provides a complete CLI reference covering CRUD operations on Unity files: reading scenes/GameObjects, creating objects/components, updating properties/transforms, deleting elements, and project-wide search.

## Development

```bash
# Validate plugin structure
claude plugin validate .

# Test plugin during development
claude --plugin-dir .

# Test hooks manually
echo '{"context":""}' | bun hooks/auto_setup.js
echo '{"context":"","user_prompt":"open test.unity"}' | bun hooks/detect_unity.js
```

## License

Apache-2.0
