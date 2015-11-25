
function Retrier(func, maxTries, interval, fail) {
	this.func = func;
	this.maxTries = maxTries;
	this.interval = interval;
	this.tries = 0;
	var self = this;
	var fail = fail;
	this.oneMoreTry = function() {
		if(self.tries < self.maxTries) {
			setTimeout(self.func, self.interval);
			self.tries++;
		} else {
			if(fail) fail();
		}
	};
	this.oneMoreTry();
}


//demo

var retrier = new Retrier(function() {
	console.log('try', retrier.tries);
	var something = Math.round(Math.random());
	if(something) {
		console.log('DONE');
	} else {
		retrier.oneMoreTry();
	}
}, 5, 50, function() {
	console.error('It is failed');
});
