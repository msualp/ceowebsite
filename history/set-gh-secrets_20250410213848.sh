#!/bin/bash

# Usage: ./set-gh-secrets.sh .env.production your-username/your-repo-name

ENV_FILE=${1:-.env}
REPO=${2:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}

DRY_RUN=false
SILENT=false

# Parse flags
for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      ;;
    --silent)
      SILENT=true
      ;;
  esac
done

if [[ ! -f "$ENV_FILE" ]]; then
  $SILENT || echo "❌ File '$ENV_FILE' not found!"
  exit 1
fi

$SILENT || echo "📦 Loading secrets from $ENV_FILE"
$SILENT || echo "📍 Target GitHub repo: $REPO"

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
      $SILENT || echo "🔄 Secret $key exists, updating anyway (GitHub doesn't expose current value)"
    else
      $SILENT || echo "🆕 Creating new secret: $key"
    fi
    if [[ "$DRY_RUN" == false ]]; then
      echo -n "$value" | gh secret set "$key" --repo "$REPO" > /dev/null
    fi
  fi
done < "$ENV_FILE"

$SILENT || echo "✅ All secrets from $ENV_FILE have been set for $REPO"
