#!/bin/bash

# Usage: ./set-gh-secrets.sh .env.production your-username/your-repo-name

ENV_FILE=${1:-.env}
REPO=${2:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ File '$ENV_FILE' not found!"
  exit 1
fi

echo "📦 Loading secrets from $ENV_FILE"
echo "📍 Target GitHub repo: $REPO"

while IFS='=' read -r key value
do
  # Skip empty lines or comments
  [[ -z "$key" || "$key" =~ ^#.* ]] && continue

  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  if [[ -n "$key" && -n "$value" ]]; then
    echo "🔐 Setting secret: $key"
    echo -n "$value" | gh secret set "$key" --repo "$REPO" > /dev/null
  fi
done < "$ENV_FILE"

echo "✅ All secrets from $ENV_FILE have been set for $REPO"
