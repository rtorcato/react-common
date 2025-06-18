# This script sets up the environment for a Node.js project by installing dependencies and setting up environment variables.
# chmod +x setup.sh

# List of required environment variables
REQUIRED_VARS=("NPM_TOKEN")

if [ -f .env ]; then
  for VAR in "${REQUIRED_VARS[@]}"; do
    VALUE=$(grep "^${VAR}=" .env | cut -d '=' -f2 | xargs)
    if [ -n "$VALUE" ]; then
      export "$VAR"="$VALUE"
      echo "$VAR has been set from .env"
    else
      echo "$VAR is empty or malformed in .env file."
      exit 1
    fi
  done
else
  echo ".env file not found. Please create one with the required variables: ${REQUIRED_VARS[*]}"
  exit 2
fi