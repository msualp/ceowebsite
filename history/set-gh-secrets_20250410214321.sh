#!/bin/bash

# Usage: ./set-gh-secrets.sh .env.production your-username/your-repo-name

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_DIR="./logs"
LOG_FILE="$LOG_DIR/set-gh-secrets-$TIMESTAMP.log"
mkdir -p "$LOG_DIR"
find "$LOG_DIR" -name '*.log' -mtime +90 -delete
exec > >(tee -a "$LOG_FILE") 2>&1

ENV_FILE=${1:-.env}
REPO=${2:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}

DRY_RUN=false
SILENT=false
VERBOSE=false

created_count=0
updated_count=0
skipped_count=0

# Parse flags
for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      ;;
    --silent)
      SILENT=true
      ;;
    --verbose)
      VERBOSE=true
      SILENT=false
      ;;
  esac
done

if [[ ! -f "$ENV_FILE" ]]; then
  $SILENT && ! $VERBOSE || echo "❌ File '$ENV_FILE' not found!"
  exit 1
fi

$SILENT && ! $VERBOSE || echo "📦 Loading secrets from $ENV_FILE"
$SILENT && ! $VERBOSE || echo "📍 Target GitHub repo: $REPO"

while IFS='=' read -r key value
do
  # Skip empty lines or comments
  [[ -z "$key" || "$key" =~ ^#.* ]] && ((skipped_count++)) && continue

  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  if [[ -n "$key" && -n "$value" ]]; then
    existing=$(gh secret list --repo "$REPO" --json name -q ".[] | select(.name==\"$key\") | .name")
    if [[ "$existing" == "$key" ]]; then
      # Can't get actual secret value from GitHub for comparison (it's encrypted),
      # so we conservatively always update if the key exists.
      $SILENT && ! $VERBOSE || echo "🔄 Secret $key exists, updating anyway (GitHub doesn't expose current value)"
      ((updated_count++))
    else
      $SILENT && ! $VERBOSE || echo "🆕 Creating new secret: $key"
      ((created_count++))
    fi
    if [[ "$DRY_RUN" == false ]]; then
      echo -n "$value" | gh secret set "$key" --repo "$REPO" > /dev/null
    fi
  fi
done < "$ENV_FILE"

$SILENT && ! $VERBOSE || echo "✅ All secrets from $ENV_FILE have been set for $REPO"
$SILENT && ! $VERBOSE || echo "📊 Summary: $created_count created, $updated_count updated, $skipped_count skipped"
