ARG RUST_VERSION=1.75.0

FROM rust:${RUST_VERSION}-slim-bookworm AS builder
WORKDIR /app
COPY . .
RUN \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build --release && \
    cp ./target/release/portefolio_back /

FROM debian:bookworm-slim AS final
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "10001" \
    appuser
COPY --from=builder /portefolio_back /usr/local/bin
RUN chown appuser /usr/local/bin/portefolio_back
COPY --from=builder /app/config /opt/portefolio_back/config
RUN chown -R appuser /opt/portefolio_back
USER appuser
ENV RUST_LOG="hello_rs=debug,info"
WORKDIR /opt/portefolio_back
ENTRYPOINT ["portefolio_back"]
EXPOSE 3200/tcp