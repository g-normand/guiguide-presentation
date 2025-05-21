TAG_NAME := DEPLOY
TAG_DATE := $(TAG_NAME)_$(shell date -u "+%Y_%m_%d_%H_%M_%S")

start:
	npm start

deploy:
	scp -r dist/* guiguide@ssh-guiguide.alwaysdata.net:/home/guiguide/www/
	git tag $(TAG_DATE); git push guigui $(TAG_DATE) --no-verify
