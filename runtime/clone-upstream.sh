#!/bin/sh

cd $(dirname $0)
cd ../upstream

rm -rf EntityFrameworkCore
git clone -b 2.1.0-rc1-final --depth 1 https://github.com/aspnet/EntityFrameworkCore.git
