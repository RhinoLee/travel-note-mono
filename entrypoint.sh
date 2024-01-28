#!/bin/sh

# 複製模板到正確的位置並替換 SERVER_NAME
envsubst '${SERVER_NAME}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# 啟動 Nginx
exec nginx -g 'daemon off;'
