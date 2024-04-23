ARG RUST_VERSION=1.75.0

FROM rust:${RUST_VERSION}-slim-bookworm AS builder
WORKDIR /app
COPY . .
RUN apt-get update && apt-get install -y libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build --release && \
    cp ./target/release/rust_backend /

FROM debian:bookworm-slim AS final
RUN apt-get update && apt-get install -y libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "10001" \
    appuser
COPY --from=builder /rust_backend /usr/local/bin
RUN chown appuser /usr/local/bin/rust_backend
RUN chown -R appuser /opt/rust_backend
USER appuser
ENV RUST_LOG="rust_backend=debug,info"
WORKDIR /opt/rust_backend
ENTRYPOINT ["rust_backend"]
EXPOSE 3200/tcp