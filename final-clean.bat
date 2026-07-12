@echo off
git rm --cached find-ack.bat list-hooks.bat cleanup.bat do-push.bat
del find-ack.bat list-hooks.bat cleanup.bat 2>nul
git add -A
git commit -m "chore: remove temp helper scripts"
git push
