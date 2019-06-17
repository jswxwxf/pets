yarn build;
scp -i ~/Downloads/kd.pem -r build/* root@47.100.172.250:/var/www/wm/build/;
scp -i ~/Downloads/cain.pem -r build/* root@47.103.63.187:/var/www/wm-mobile/;