#!/bin/bash

# prisma client gernerating requires a `.env` file under ./prisma
echo "DATABASE_URL=$DATABASE_URL" > ./prisma/.env

yarn build
