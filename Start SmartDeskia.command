#!/bin/zsh

cd "${0:A:h}" || exit 1

CODEX_NODE="/Users/nickallen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
CODEX_TOOLS="/Users/nickallen/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback"

if ! command -v node >/dev/null 2>&1 && [[ -d "$CODEX_NODE" ]]; then
  export PATH="$CODEX_NODE:$CODEX_TOOLS:$PATH"
fi

if command -v pnpm >/dev/null 2>&1; then
  pnpm install
  pnpm dev -- --port 3001 &
  SERVER_PID=$!
elif command -v npm >/dev/null 2>&1; then
  npm install
  npm run dev -- --port 3001 &
  SERVER_PID=$!
else
  echo "Node.js could not be found. Install Node.js from https://nodejs.org and try again."
  read "?Press Return to close."
  exit 1
fi

sleep 4
open "http://localhost:3001/"
wait "$SERVER_PID"
