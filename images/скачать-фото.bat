@echo off
chcp 65001 >nul
echo Скачиваю фотографии с текущего сайта на Tilda в папку images...
curl -L -o sofia.jpg   "https://static.tildacdn.com/tild3461-3030-4530-a538-313566376136/photo_2026-01-20_12-.jpg"
curl -L -o about.jpg   "https://static.tildacdn.com/tild3630-3432-4234-b138-353832623936/IMG_0422_4.jpg"
curl -L -o og.jpg      "https://static.tildacdn.com/tild3630-3432-4234-b138-353832623936/IMG_0422_4.jpg"
curl -L -o favicon.png "https://static.tildacdn.com/tild6132-3436-4164-a561-366466316539/rounded-in-photoretr.png"
echo Готово. Проверьте, что файлы sofia.jpg, about.jpg, og.jpg и favicon.png появились в папке.
pause
