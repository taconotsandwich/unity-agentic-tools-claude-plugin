#!/usr/bin/env bun
/**
 * Hook: SessionStart
 * Checks for globally installed unity-agentic-tools CLI.
 * If missing: injects installation instructions into context.
 * If present: exits silently (fast path, no output).
 */

const readline = require('readline');
const os = require('os');
const { execSync } = require('child_process');

async function readStdin() {
    const rl = readline.createInterface({ input: process.stdin });
    const lines = [];
    for await (const line of rl) {
        lines.push(line);
    }
    return lines.join('\n');
}

function checkCLI() {
    const isWindows = os.platform() === 'win32';
    try {
        execSync(isWindows ? 'where unity-agentic-tools' : 'which unity-agentic-tools', { stdio: 'pipe' });
        return { installed: true, isWindows };
    } catch {
        return { installed: false, isWindows };
    }
}

function getInstallInstructions(isWindows) {
    const lines = [
        '# unity-agentic-tools CLI is not installed.',
        'Install it before using this plugin:',
        '',
        '```bash',
        'npm install -g unity-agentic-tools',
        '```',
    ];
    if (isWindows) {
        lines.push(
            '',
            'Or use npx as a fallback:',
            '```bash',
            'npx unity-agentic-tools <command>',
            '```',
        );
    }
    return lines.join('\n');
}

async function main() {
    try {
        const input = await readStdin();
        const data = JSON.parse(input);

        const { installed, isWindows } = checkCLI();

        if (!installed) {
            data.context = (data.context || '') + getInstallInstructions(isWindows) + '\n';
        }

        console.log(JSON.stringify(data));
    } catch (err) {
        process.stderr.write(`Hook error: ${err.message}\n`);
        process.exit(1);
    }
}

main();
