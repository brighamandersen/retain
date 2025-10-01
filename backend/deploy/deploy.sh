#!/bin/bash
set -euo pipefail

echo "Deploying retain-api"

# nginx

sudo cp /home/brig/code/retain/backend/deploy/nginx.conf /etc/nginx/conf.d/retain-api.conf

sudo nginx -t
sudo systemctl reload nginx

# backend

cd /home/brig/code/retain/backend
npm run build

# systemd

sudo cp /home/brig/code/retain/backend/deploy/systemd.service /etc/systemd/system/retain-api.service

sudo systemctl daemon-reload
sudo systemctl enable retain-api.service
sudo systemctl restart retain-api.service

echo "Deployment complete for retain-api"
