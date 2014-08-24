phantom.injectJs('MakePostMultipartStr.js');

phantom.injectJs('AntigateCom.js');

AntigateCom.Init('antigate.com', '111');

var captcha = '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';

AntigateCom.RecognizeBase64(captcha, function(ret) {
	console.log(ret);
	phantom.exit();
});

/*AntigateCom.Recognize(atob(captcha), function(ret) {
	console.log(ret);
	phantom.exit();
});*/