var MakePostStr = {
	
	boundary: false,
	
	MakeRandomStr: function(n) {
		var text = '',
			possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for(var i = 0; i < n; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	},
	
	MakePostStr: function(a) {
		var ret = [];
		for(var i in a) {
			ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(a[i]));
		}
		ret = ret.join('&');
		return ret;
	},
	
	GenerateBoundary: function() {
		var boundary = '----' + this.MakeRandomStr(24);
		this.boundary = boundary;
		return boundary;
	},
	
	/*
[
	{
		method: 'post', //base64
		key: antigate_key,
		soft_id: '615'
	}, {
		name: 'file',
		filename: 'c.jpg',
		contenttype: 'image/jpeg',
		content: captcha
	}//, {
	//	body: captcha // base64-encoded if method == base64
	//}
]
	*/
	
	MakePostMultipartStr: function(a) {
		if(!this.boundary) this.GenerateBoundary();
		var ret = '';
		for(i in a) {
			var a1 = a[i];
			if(a1.name && a1.filename && a1.contenttype && a1.content) {
				ret += '--' + this.boundary + "\r\n";
				ret += 'Content-Disposition: form-data; name="' + encodeURIComponent(a1.name) + '";' + 
						' filename="' + encodeURIComponent(a1.filename) + '"' + "\r\n";
				ret += 'Content-Type: ' + a1.contenttype + "\r\n\r\n";
				ret += a1.content + "\r\n";
			} else {
				for(j in a1) {
					ret += '--' + this.boundary + "\r\n";
					ret += 'Content-Disposition: form-data; name="' + encodeURIComponent(j) + '"' + "\r\n\r\n";
					ret += a1[j] + "\r\n";
				}
			}
		}
		return ret;
	}
	
};
