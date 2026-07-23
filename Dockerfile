# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:20-bookworm-slim
ARG NGINX_IMAGE=nginx:1.27-alpine

FROM ${NODE_IMAGE} AS build
WORKDIR /app

# Default to the new public GitHub repo; Coolify can override `REPO_URL` if needed
ARG REPO_URL=https://github.com/DrvxTheCoder/jean-jelva-wedding-v3.git
ARG GIT_SSL_NO_VERIFY=false
ARG VITE_RSVP_WEBAPP_URL=
ENV VITE_RSVP_WEBAPP_URL=${VITE_RSVP_WEBAPP_URL}

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
    && corepack prepare pnpm@10.12.4 --activate

RUN if [ "$GIT_SSL_NO_VERIFY" = "true" ]; then git config --global http.sslVerify false; fi

RUN if [ -n "$REPO_URL" ]; then \
      rm -rf /app/* /app/.[!.]* /app/..?*; \
      git clone --depth 1 "$REPO_URL" /app; \
    fi

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM ${NGINX_IMAGE}
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  # Serve static files with cache headers
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Proxy RSVP requests to Google Apps Script
  location /api/rsvp {
    proxy_pass https://script.google.com/macros/s/AKfycbwIuLzJxMcLUnVZei4Q2ukwjZ8725HnRyfPr6eJZGsVnTdiSQfPxn6WSSCIsX9UNScK/exec;
    proxy_http_version 1.1;
    proxy_set_header Host script.google.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_redirect off;
  }

  # SPA routing: serve index.html for all non-asset routes
  location / {
    try_files $uri $uri/ /index.html;
  }
}
EOF
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
