FROM microsoft/dotnet:2.1-sdk-bionic

# apt-get dependencies
RUN apt-get update \
    && apt-get install -y \
        curl \
        jq \
        unzip \
        wget

# install nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -\
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn \
    && yarn global add n \
    && n lts

# add ubuntu user
RUN addgroup --gid 1000 ubuntu \
    && adduser --uid 1000 --ingroup ubuntu --home /home/ubuntu --shell /bin/sh --disabled-password --gecos "" ubuntu

# install fixuid
RUN curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.4/fixuid-0.4-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - \
    && chown root:root /usr/local/bin/fixuid \
    && chmod 4755 /usr/local/bin/fixuid

# copy stage directory
COPY stage/ /

# create user directories
RUN mkdir -p /home/ubuntu/.nuget /home/ubuntu/project \
    && chown ubuntu:ubuntu /home/ubuntu/.nuget /home/ubuntu/project

# set workdir, entrypoint, and user
WORKDIR /home/ubuntu/project
ENTRYPOINT ["fixuid"]
USER ubuntu:ubuntu
