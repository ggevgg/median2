#!/bin/sh

echo "=================================="
echo DATABASE_URL=
echo $DATABASE_URL
npx prisma db push
npm run start:dev