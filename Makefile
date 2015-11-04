default:
	./js -f bootstrap.js -f test/default.js

.PHONY: test
test :
	./js -f bootstrap.js -f test/testcase.js -f test/test.js

octane :
	./js -f bootstrap.js -f benchmark/octane/octane.js
