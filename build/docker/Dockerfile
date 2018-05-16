FROM microsoft/dotnet:2.1-sdk-bionic

# Environment Varialbes
ENV OMNISHARP_VSCODE_VERSION=1.14.0

# apt-get dependencies
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y \
        curl \
        jq \
        unzip \
        wget \
        yarn

# add ubuntu user
RUN addgroup --gid 1000 ubuntu \
    && adduser --uid 1000 --ingroup ubuntu --home /home/ubuntu --shell /bin/sh --disabled-password --gecos "" ubuntu

# install fixuid
RUN curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.3/fixuid-0.3-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - \
    && chown root:root /usr/local/bin/fixuid \
    && chmod 4755 /usr/local/bin/fixuid

# install nodejs
RUN yarn global add n \
    && n lts

# install omnisharp-vscode
RUN mkdir /opt/omnisharp-vscode \
    && cd /opt/omnisharp-vscode \
    && wget -q "https://github.com/OmniSharp/omnisharp-vscode/releases/download/v${OMNISHARP_VSCODE_VERSION}/csharp-${OMNISHARP_VSCODE_VERSION}.vsix" \
    && unzip -q "csharp-${OMNISHARP_VSCODE_VERSION}.vsix" \
    && rm "csharp-${OMNISHARP_VSCODE_VERSION}.vsix" \
    && cd extension \
    && url=$(jq -r '.runtimeDependencies[] | select(.description == "OmniSharp for Linux (x64)") | .url' < package.json | head -n 1) \
    && zip_file=$(basename "$url") \
    && mkdir .omnisharp \
    && cd .omnisharp \
    && wget -q "$url" \
    && unzip -q "$zip_file" \
    && rm "$zip_file" \
    && chmod +x mono.linux-x86_64 run

# copy stage directory
COPY stage/ /

# create user directories
RUN mkdir -p /home/ubuntu/.nuget /home/ubuntu/project \
    && chown ubuntu:ubuntu /home/ubuntu/.nuget /home/ubuntu/project

# set workdir, entrypoint, and user
WORKDIR /home/ubuntu/project
ENTRYPOINT ["fixuid"]
USER ubuntu:ubuntu
