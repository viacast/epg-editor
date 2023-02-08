#!/bin/bash
set -e

HOST="viacast.tv"
timestamp() {
  date +'%Y%m%d_%H%M%S'
}

build_file=epg-editor-build-$(timestamp).tar
tar -zcvf $build_file -C build/ .
scp -P 10522 $build_file root@$HOST:/tmp/
ssh root@$HOST -p 10522 "cd /var/www/html/wordpress/epg/ && rm -r /var/www/html/wordpress/epg/* && tar -xvf /tmp/$build_file"
