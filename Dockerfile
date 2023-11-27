# Build frontend
FROM node:alpine AS frontend-builder
WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile
ARG VITE_APP_URL
RUN yarn turbo run build --filter=@henry-pf/frontend

# Prune backend (for reduced image size)
FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@henry-pf/backend --docker

# Install pruned dependencies and build the project
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
COPY --from=builder /app/out/full/ .
RUN yarn prisma generate
RUN yarn turbo run build --filter=@henry-pf/backend

# Host frontend files with backend API
FROM node:alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs
COPY --from=installer --chown=nodejs:nodejs /app/packages/backend/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /app/packages/backend/dist ./dist
COPY --from=frontend-builder --chown=nodejs:nodejs /app/packages/frontend/dist ./public
CMD [ "yarn", "start" ]
