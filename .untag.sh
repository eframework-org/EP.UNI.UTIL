#!/bin/sh

version=$(grep -o '"version": "[^"]*' package.json  | grep -o '[^"]*$')

read -p "Untag version is v$version, proceed? [Y/n]: " temp

if [[ "$temp" == "y" || "$temp" == "Y" ]]; then
    git tag --delete v${version}
    git push origin --delete v${version}
    read -p "Untag succeed."
else
    echo "Abort to untag."
fi