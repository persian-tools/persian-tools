prepare-release:
	npm install
	npm lint
	npm prettier:ci
	npm test
	npm build
.PHONY: prepare-release

build-docs:
	npx rimraf ./docs
	npx typedoc --options ./typedoc.js
.PHONY: build-docs

publish-docs: build-docs
	rm -rf /tmp/persian-tools-docs | true
	mkdir /tmp/persian-tools-docs
	cp -r ./docs /tmp/persian-tools-docs
	cd /tmp/persian-tools-docs && \
	git clone --single-branch --branch gh-pages git@github.com:persian-tools/persian-tools.git && \
	cp -r /tmp/persian-tools-docs/docs/* /tmp/persian-tools-docs/persian-tools/ && \
	cd /tmp/persian-tools-docs/persian-tools && \
	git add --all && \
	git commit -m "meta: Update docs" && \
	git push origin gh-pages
.PHONY: publish-docs
