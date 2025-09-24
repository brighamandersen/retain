#!/bin/bash
set -euo pipefail

echo "Deploying retain"

# nginx

cd /home/brig/code/retain/frontend
npm run build

sudo ln -sf /home/brig/code/retain/deploy/nginx/retain.conf /etc/nginx/conf.d/retain.conf

sudo nginx -t
sudo systemctl reload nginx

# systemd

sudo ln -sf /home/brig/code/retain/deploy/systemd/retain.service /etc/systemd/system/retain.service

sudo systemctl daemon-reload
sudo systemctl enable retain.service
sudo systemctl restart retain.service

echo "Deployment complete for retain"
