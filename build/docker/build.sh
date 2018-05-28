#!/bin/bash

cd $(dirname $0)

name="openef-codegen"

docker build -t "$name" .
