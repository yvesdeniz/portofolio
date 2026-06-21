# ==========================================
# STAGE 1: INSTALL DEPENDENCIES
# ==========================================
FROM oven/bun:1.1-alpine AS deps
WORKDIR /app

# Copy lockfiles and manifests first to optimize layer caching
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# ==========================================
# STAGE 2: BUILD APPLICATION
# ==========================================
FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

# Bring over node_modules from deps stage and copy remaining source files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set Next.js environment to production build mode
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Compile the application using Bun
RUN bun run build

# ==========================================
# STAGE 3: RUNNER ENVIRONMENT
# ==========================================
FROM oven/bun:1.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Create an underprivileged system user for safe container execution
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy over the public assets and built distribution targets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch execution scope away from root
USER nextjs

EXPOSE 3001

# Next.js standalone server outputs a clean server.js file to execute via Bun
CMD ["bun", "server.js"]
