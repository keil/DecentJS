default:
	./js -f bootstrap.js -f test/default.js

.PHONY: test
test:
	./js -f bootstrap.js -f test/testcase.js -f test/test.js

octane:
	./js -f bootstrap.js -f benchmark/octane/octane.js

octane2:
	./js -f bootstrap.js -f benchmark/octane2/octane.js

sync:
	svn ci -m "sync"

benchmark:
	./jsx -f bootstrap.js -f benchmark/octane/octane.js >> benchmark/octane/out/$(file).$(mode).$(system).decentjs1.0.3poc.out 
