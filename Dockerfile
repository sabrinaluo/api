FROM node:12.4.0 AS builder
WORKDIR /srv

ARG TRAVIS_BRANCH
ARG TRAVIS_BUILD_NUMBER
ARG TRAVIS_COMMIT
ARG TRAVIS_TIMESTAMP

COPY . .

RUN yarn --frozen-lockfile \
    && yarn build

# Run Stage
FROM node:12.4.0
WORKDIR /srv

COPY --from=builder /srv/dist ./dist
COPY --from=builder /srv/.env ./

ENV PORT=3000 \
    NODE_ENV=production
