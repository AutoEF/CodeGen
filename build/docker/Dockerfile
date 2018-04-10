FROM ubuntu:16.04

ENV OMNISHARP_VSCODE_VERSION=1.14.0

RUN apt-get update \
    && apt-get install -y \
        curl \
        jq \
        unzip \
        wget

RUN mkdir /opt/omnisharp-vscode \
    && cd /opt/omnisharp-vscode \
    && wget -q "https://github.com/OmniSharp/omnisharp-vscode/releases/download/v${OMNISHARP_VSCODE_VERSION}/csharp-${OMNISHARP_VSCODE_VERSION}.vsix" \
    && unzip -q csharp-1.14.0.vsix \
    && rm csharp-1.14.0.vsix \
    && cd extension \
    && url=$(jq -r '.runtimeDependencies[] | select(.description == "OmniSharp for Linux (x64)") | .url' < package.json | head -n 1) \
    && zip_file=$(basename "$url") \
    && mkdir .omnisharp \
    && cd .omnisharp \
    && wget -q "$url" \
    && unzip -q "$zip_file" \
    && rm "$zip_file" \
    && chmod +x mono.linux-x86_64 run

COPY stage/ /
