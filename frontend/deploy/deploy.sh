#!/bin/bash
set -euo pipefail

echo "Deploying retain"

# frontend

cd /home/brig/code/retain/frontend
npm run build

# nginx

sudo cp /home/brig/code/retain/frontend/deploy/nginx.conf /etc/nginx/conf.d/retain.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for retain"
