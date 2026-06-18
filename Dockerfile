# ========================================
# Production Dockerfile (Node.js SPA, No Nginx)
# ========================================
# 
# Purpose:
# - Multi-stage build for a Node.js Single Page Application (SPA)
# - Compiles frontend assets using Node 20 Alpine
# - Serves static production build using `serve`
#
# Architecture:
# 1. Builder stage:
#    - Installs dependencies using npm ci
#    - Builds optimized production assets (dist/)
#
# 2. Runtime stage:
#    - Minimal Node.js Alpine runtime image
#    - Uses `serve` to host static files
#    - Runs as a non-root user for security
#
# Notes:
# - No Nginx is used (simplified static hosting approach)
# - Suitable for small to medium production deployments
# - Lacks advanced caching, compression tuning, and TLS handling
# - For high-scale production, consider Nginx or Caddy instead
# - Exposes port 4173 for application access
#
# Security:
# - Runs under non-root user (UID 1001)
# - Only production build artifacts are included in runtime image
# - Global package installation happens at build time (serve)
#
# ========================================

########## Stage 1: Build ##########
FROM node:20-alpine AS builder
 
WORKDIR /app
 
COPY package.json package-lock.json ./
RUN npm ci
 
COPY . .
RUN npm run build
 
 
########## Stage 2: Runtime ##########
FROM node:20-alpine
 
WORKDIR /app
 
# Install minimal static file server
RUN npm install -g serve@14
 
# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup
 
# Copy built files only
COPY --from=builder /app/dist ./dist
 
# Fix permissions
RUN chown -R appuser:appgroup /app
 
USER appuser
 
EXPOSE 4173
 
# Serve SPA (single-page app support)
CMD ["serve", "-s", "dist", "-l", "4173"]
