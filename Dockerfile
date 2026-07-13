# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:20-bookworm-slim
ARG NGINX_IMAGE=nginx:1.27-alpine

FROM ${NODE_IMAGE} AS build
WORKDIR /app

ENV REPO_URL=${REPO_URL}
ENV GIT_USERNAME=${GIT_USERNAME}
ENV GIT_TOKEN=${GIT_TOKEN}
ENV GIT_SSL_NO_VERIFY=${GIT_SSL_NO_VERIFY}
ENV VITE_RSVP_WEBAPP_URL=${VITE_RSVP_WEBAPP_URL}


RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
    && corepack prepare pnpm@10.12.4 --activate

RUN if [ "$GIT_SSL_NO_VERIFY" = "true" ]; then git config --global http.sslVerify false; fi

RUN if [ -n "$REPO_URL" ]; then \
      rm -rf /app/* /app/.[!.]* /app/..?*; \
      if [ -n "$GIT_USERNAME" ] && [ -n "$GIT_TOKEN" ]; then \
        REPO_URL_NO_SCHEME="${REPO_URL#https://}"; \
        git clone --depth 1 "https://${GIT_USERNAME}:${GIT_TOKEN}@${REPO_URL_NO_SCHEME}" /app; \
      else \
        git clone --depth 1 "$REPO_URL" /app; \
      fi; \
    fi

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM ${NGINX_IMAGE}
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
