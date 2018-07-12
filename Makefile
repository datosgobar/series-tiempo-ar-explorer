build:
	npm run build
	rm docs/* -r
	cp build/* docs/ -r

setup:
	npm install

watch:
	npm start

.PHONY: all build clean
