#!/bin/bash

cd $(dirname $0)
cd ../../

name="openef-codegen"

docker run \
    --rm \
    -it \
    -v "$(pwd):/home/ubuntu/project" \
    "$name" \
    bash
