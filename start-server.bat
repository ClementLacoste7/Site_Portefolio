@echo off
echo ========================================
echo   LANCEMENT DU SERVEUR LOCAL
echo ========================================
echo.
echo Le site sera disponible a : http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
echo ========================================
echo.

python -m http.server 8000

pause
