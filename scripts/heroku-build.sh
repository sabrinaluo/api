#!/bin/bash

# prisma client generating requires a `.env` file under ./prisma
echo "DATABASE_URL=$DATABASE_URL" > ./prisma/.env

yarn build
