init: && cf-typegen
    pnpm install

deploy:
    git push origin main:release/prod

dev:
    pnpm run dev

start:
    pnpm run start

cf-typegen:
    pnpm run cf-typegen

format:
    pnpm run format

compile: && format
    pnpm run config:compile
