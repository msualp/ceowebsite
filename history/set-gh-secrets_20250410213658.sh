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
    existing=$(gh secret list --repo "$REPO" --json name -q ".[] | select(.name==\"$key\") | .name")
    if [[ "$existing" == "$key" ]]; then
      # Can't get actual secret value from GitHub for comparison (it's encrypted),
      # so we conservatively always update if the key exists.
      echo "🔄 Secret $key exists, updating anyway (GitHub doesn't expose current value)"
    else
      echo "🆕 Creating new secret: $key"
    fi
    echo -n "$value" | gh secret set "$key" --repo "$REPO" > /dev/null
  fi
done < "$ENV_FILE"

echo "✅ All secrets from $ENV_FILE have been set for $REPO"
