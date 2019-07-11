.PHONY: all build clean docs

build:
	npm run build-docs

setup:
	npm install

watch:
	npm start

components-watch:
	env COMPONENTS=1 npm start

release:
	npm run release

release-components:
	npm run release-components

servedocs:
	mkdocs serve

docs:
	mkdocs build
	rsync -vau --remove-source-files site/ docs/
	rm -rf site

