#!/usr/bin/env sh
set -eu

: "${API_HOST:=api}"
: "${API_PORT:=8080}"

export API_HOST API_PORT

envsubst '${API_HOST} ${API_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
