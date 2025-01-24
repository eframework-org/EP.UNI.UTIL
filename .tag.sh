#!/bin/sh

version=$(grep -o '"version": "[^"]*' package.json  | grep -o '[^"]*$')

read -p "Tag version is v$version, proceed? [Y/n]: " temp

if [[ "$temp" == "y" || "$temp" == "Y" ]]; then
    git tag v${version}
    git push --tags
    read -p "Tag succeed."
else
    echo "Abort to tag."
fi