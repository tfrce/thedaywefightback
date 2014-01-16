js:
	cat js/libs/* | yui-compressor --type js -o js/libs.min.js

css:

all:
	make js
	make css

.PHONY: js css all