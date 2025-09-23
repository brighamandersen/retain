#!/bin/bash
set -euo pipefail

echo "Deploying retain"

sudo ln -sf /home/brig/code/retain/infra/systemd/retain.service /etc/systemd/system/retain.service

sudo ln -sf /home/brig/code/retain/infra/nginx/retain.conf /etc/nginx/conf.d/retain.conf

cd /home/brig/code/retain
npm run build

sudo systemctl daemon-reload
sudo systemctl enable retain.service
sudo systemctl restart retain.service

sudo nginx -t
sudo systemctl reload nginx

echo "Deployment complete for retain"
