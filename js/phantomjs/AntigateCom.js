var AntigateCom = {
	
	antigate_domain: '',
	antigate_key: '',
	
	debug: true,
	
	recognize_timeout: 120000,
	
	Init: function(domain, key) {
		this.antigate_domain = domain;
		this.antigate_key = key;
	},
	
	Recognize: function(captcha_content, on_done) {
		return this._recognize(captcha_content, on_done, false);
	},
	
	RecognizeBase64: function(captcha_content, on_done) {
		return this._recognize(captcha_content, on_done, true);
	},
	
	_recognize: function(captcha_content, on_done, is_base64) {
		if(!this.antigate_domain) {
			console.log('Set up antigate.com domain!');
			return false;
		}
		if(!this.antigate_key) {
			console.log('Set up antigate.com API key!');
			return false;
		}
		
		if(this.debug) console.log('antigate: send captcha');
		
		var antigate_page = require('webpage').create(),
			antigate_timeout,
			antigate_done_function,
			antigate_check_timeout,
			boundary = MakePostStr.GenerateBoundary(),
			antigate_debug = this.debug,
			antigate_domain = this.antigate_domain,
			antigate_key = this.antigate_key;
		
		antigate_page.customHeaders = {
			'Content-Type': 'multipart/form-data; boundary=' + boundary
		};
		
		if(is_base64) {
			var antigate_data = [{
				method: 'base64',
				key: antigate_key,
				soft_id: '615',
				body: captcha_content
			}];
		} else {
			var antigate_data = [{
				method: 'post',
				key: antigate_key,
				soft_id: '615'
			}, {
				name: 'file',
				filename: 'c.jpg',
				contenttype: 'image/jpeg',
				content: captcha_content
			}];
		}
		
		antigate_page.open('http://' + antigate_domain + '/in.php',
			'POST',
			MakePostStr.MakePostMultipartStr(antigate_data),
			function() {
				var antigate_res = antigate_page.plainText;
				antigate_res = antigate_res.split('|');
				if((antigate_res[0] == 'OK') && (antigate_res[1])) {
					var check_url = 'http://' + antigate_domain + '/res.php?key=' + antigate_key + '&action=get&id=' + antigate_res[1];
					var func_check_antigate = function() {
						if(antigate_debug) console.log('antigate: check');
						antigate_page.open(check_url, function() {
							var antigate_res = antigate_page.plainText;
							if(antigate_res != 'CAPCHA_NOT_READY') {
								antigate_res = antigate_res.split('|');
								if((antigate_res[0] == 'OK') && (antigate_res[1])) {
									antigate_done_function('antigate done: '+antigate_res[1], antigate_res[1]);
								} else {
									antigate_done_function('antigate error: ' + antigate_page.plainText, false);
								}
							} else {
								if(antigate_debug) console.log('antigate: capcha_not_ready');
								antigate_check_timeout = setTimeout(func_check_antigate, 5000);
							}
						});
					};
					antigate_check_timeout = setTimeout(func_check_antigate, 10000);
				} else {
					antigate_done_function('antigate error: ' + antigate_page.plainText, false);
				}
			}
		);
		
		antigate_done_function = function(msg, ret) {
			clearTimeout(antigate_timeout);
			clearTimeout(antigate_check_timeout);
			if(antigate_debug) console.log(msg);
			antigate_page.close();
			on_done(ret);
		};
		
		antigate_timeout = setTimeout(function() {
			antigate_done_function('antigate timeout', false);
		}, this.recognize_timeout);
		
		return true;
	}
	
};
