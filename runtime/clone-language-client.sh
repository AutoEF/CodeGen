#!/bin/sh

cd $(dirname $0)
cd ../vendor

rm -rf omnisharp-vscode
git clone -b v1.14.0 --depth 1 https://github.com/OmniSharp/omnisharp-vscode.git
cd omnisharp-vscode

rm -rf ../../language-client/src/omnisharp-vscode
cp -r src ../../language-client/src/omnisharp-vscode

rm -rf ../../language-client/typings/omnisharp-vscode
cp -r typings ../../language-client/typings/omnisharp-vscode
