#!/usr/bin/env bash

npm run pkg-win
npm run pkg-mac
npm run pkg-linux

appName="electron-work-jornal"
folderDesk = "Рабочий\ стол"
folder="/home/igor/${folderDesk}/projects/${appName}/app_build"

lin=$folder"/"$appName"-linux-x64"
linZip=$lin".tar.gz"

mac=$folder"/"$appName"-darwin-x64"
macZip=$mac".tar.gz"

win=$folder"/"$appName"-win32-ia32"
winZip=$win".tar.gz"

tar -czvf $linZip $lin
tar -czvf $macZip $mac
tar -czvf $winZip $win

echo "finish build"
