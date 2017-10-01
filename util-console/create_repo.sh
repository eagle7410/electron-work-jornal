#!/usr/bin/env bash
echo "# electron_work_jornal" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git://github.com/eagle7410/electron-work-jornal.git
git push -u origin master
