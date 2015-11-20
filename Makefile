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

.PHONY: benchmark
benchmark:
	#	./jsx -f bootstrap.js -f benchmark/octane/octane.js >> benchmark/octane/out/$(file).$(mode).$(system).decentjs1.0.3poc.out 
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.js" >>  benchmark/octane/out/$(file).$(mode).$(system).decentjs1.0.3poc.out

benchmark2:
	#	./jsx -f bootstrap.js -f benchmark/octane/octane.js >> benchmark/octane2/out/$(file).$(mode).$(system).decentjs1.0.3poc.out 
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane2/octane.js" >>  benchmark/octane2/out/$(file).$(mode).$(system).decentjs1.0.3poc.out
