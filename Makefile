default:
	./js -f bootstrap.js -f test/default.js

.PHONY: test
test:
	./js -f bootstrap.js -f test/testcase.js -f test/test.js

#octane:
#	./js -f bootstrap.js -f benchmark/octane/octane.js

#octane2:
#	./js -f bootstrap.js -f benchmark/octane2/octane.js

sync:
	svn ci -m "sync"

.PHONY: benchmark
#benchmark:
#	#	./jsx -f bootstrap.js -f benchmark/octane/octane.js >> benchmark/octane/out/$(file).$(mode).$(system).decentjs1.0.3poc.out 
#	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.js" >>  benchmark/octane/out/$(file).$(mode).$(system).decentjs1.0.3poc.out
#
#benchmark2:
#	#	./jsx -f bootstrap.js -f benchmark/octane/octane.js >> benchmark/octane2/out/$(file).$(mode).$(system).decentjs1.0.3poc.out 
#	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane2/octane.js" >>  benchmark/octane2/out/$(file).$(mode).$(system).decentjs1.0.3poc.out

octaine:
	./js -f bootstrap.js -f benchmark/octane/octane.all.js -f benchmark/octane/octane.js


richards:
	./js -f bootstrap.js -f benchmark/octane/octane.richards.js -f benchmark/octane/octane.js

crypto:
	./js -f bootstrap.js -f benchmark/octane/octane.crypto.js -f benchmark/octane/octane.js

raytrace:
	./js -f bootstrap.js -f benchmark/octane/octane.raytrace.js -f benchmark/octane/octane.js

earley-boyer:
	./js -f bootstrap.js -f benchmark/octane/octane.earley-boyer.js -f benchmark/octane/octane.js

regexp:
	./js -f bootstrap.js -f benchmark/octane/octane.regexp.js -f benchmark/octane/octane.js

splay:
	./js -f bootstrap.js -f benchmark/octane/octane.splay.js -f benchmark/octane/octane.js

navier-stokes:
	./js -f bootstrap.js -f benchmark/octane/octane.navier-stokes.js -f benchmark/octane/octane.js

pdfjs:
	./js -f bootstrap.js -f benchmark/octane/octane.pdfjs.js -f benchmark/octane/octane.js

mandreel:
	./js -f bootstrap.js -f benchmark/octane/octane.mandreel.js -f benchmark/octane/octane.js

gbemu:
	./js -f bootstrap.js -f benchmark/octane/octane.gbemu.js -f benchmark/octane/octane.js

code-load:
	./js -f bootstrap.js -f benchmark/octane/octane.code-load.js -f benchmark/octane/octane.js

box2d:
	./js -f bootstrap.js -f benchmark/octane/octane.box2d.js -f benchmark/octane/octane.js

typescript:
	./js -f bootstrap.js -f benchmark/octane/octane.typescript.js -f benchmark/octane/octane.js


octaine-all:
	./js -f bootstrap.js -f benchmark/octane/octane.richards.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.crypto.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.raytrace.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.earley-boyer.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.regexp.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.splay.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.navier-stokes.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.pdfjs.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.mandreel.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.gbemu.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.code-load.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.box2d.js -f benchmark/octane/octane.js
	./js -f bootstrap.js -f benchmark/octane/octane.typescript.js -f benchmark/octane/octane.js


benchmark:
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.richards.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/richards.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.crypto.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/crypto.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.raytrace.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/raytrace.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.earley-boyer.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/earley-boyer.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.regexp.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/regex.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.splay.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/splay.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.navier-stokes.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/navier-strokes.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.pdfjs.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/pdfjs.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.mandreel.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/mandreel.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.gbemu.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/gbemu.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.code-load.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/code-load.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.box2d.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/box2d.$(mode).vpt.decentjs1.0.3poc.out
	vpt -w pool4 -p\#99 -V LD_LIBRARY_PATH=$LD_LIBRARY_PATH -c "./jsx -f bootstrap.js -f benchmark/octane/octane.typescript.js -f benchmark/octane/octane.js" >>  benchmark/out/octaine/typescript.$(mode).vpt.decentjs1.0.3poc.out
