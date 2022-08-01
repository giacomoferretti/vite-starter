#!/usr/bin/env sh

# Reference: https://vitejs.dev/guide/static-deploy.html#github-pages

set -e

USER="giacomoferretti"
REPO="vite-starter"

pnpm run build

cd dist
echo "vite-starter.giacomoferretti.com" > CNAME

git init
git checkout -b main
git add -A
git commit -m "deploy"

git push -f git@github.com:"${USER}"/"${REPO}".git main:gh-pages

cd -
