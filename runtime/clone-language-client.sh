#!/bin/sh

cd $(dirname $0)
cd ../language-client/vendor

rm -rf omnisharp-vscode
git clone -b v1.14.0 --depth 1 https://github.com/OmniSharp/omnisharp-vscode.git
