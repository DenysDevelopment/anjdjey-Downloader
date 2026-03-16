#!/bin/bash
# Установка/обновление yt-dlp

echo "Установка yt-dlp..."

if command -v yt-dlp &> /dev/null; then
    echo "yt-dlp уже установлен: $(yt-dlp --version)"
    echo "Обновление..."
    yt-dlp -U
else
    echo "Установка yt-dlp..."
    if command -v brew &> /dev/null; then
        brew install yt-dlp
    elif command -v pip3 &> /dev/null; then
        pip3 install yt-dlp
    else
        echo "Установите yt-dlp вручную: https://github.com/yt-dlp/yt-dlp"
        exit 1
    fi
fi

echo "yt-dlp версия: $(yt-dlp --version)"
echo "Готово!"
