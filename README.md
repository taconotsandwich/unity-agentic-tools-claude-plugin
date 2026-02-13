# Unity Agentic Tools - Claude Code Plugin

A Claude Code plugin that integrates the [unity-agentic-tools](https://github.com/taconotsandwich/unity-agentic-tools) CLI for token-efficient parsing, analysis, and editing of Unity YAML files (.unity, .prefab, .asset).

## Prerequisites

The `unity-agentic-tools` CLI must be installed globally:

```bash
npm install -g unity-agentic-tools
```

## Installation

### From Marketplace (in Claude Code)

```bash
/plugin install unity-agentic-tools
```

### From Source

```bash
git clone https://github.com/taconotsandwich/unity-agentic-tools-claude-plugin.git
# Then add the plugin directory in Claude Code settings
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

## Version Compatibility

| Plugin Version | Minimum CLI Version |
|---------------|-------------------|
| 0.1.0 | 0.1.0 |

## Development

```bash
# Validate all JSON configs
jq empty .claude-plugin/plugin.json
jq empty .claude-plugin/marketplace.json
jq empty hooks/hooks.json

# Test hooks manually
echo '{"context":""}' | bun hooks/auto_setup.js
echo '{"context":"","user_prompt":"open test.unity"}' | bun hooks/detect_unity.js
```

## License

Apache-2.0
