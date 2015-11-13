
function promiseLoop(param, fn, promise) {
	if(typeof(promise) == 'undefined') {
		promise = Promise.resolve(param);
	}
	return promise
		.then(function(fn_ret) {
			return new Promise(function(resolve, reject) {
				return fn(fn_ret, resolve, reject);
			});
		})
		.then(function(fn_ret) {
			if(!fn_ret.done) {
				return promiseLoop(fn_ret, fn, promise);
			} else {
				return fn_ret;
			}
		})
	;
}


//demo

promiseLoop(
	{i:1, done:false},
	function(param, resolve, reject) {
		setTimeout(function() {
			console.log(param.i);
			param.i++;
			param.done = param.i > 5;
			resolve(param);
		}, 300);
	}
)
.then(function(param) {
	console.log('done', param);
})
;