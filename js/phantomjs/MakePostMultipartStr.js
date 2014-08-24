var MakePostStr = {
	
	_boundary: false,
	
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
		if(!this._boundary) this._boundary = '----' + this.MakeRandomStr(24);
		var ret = '--' + this._boundary + "\r\n";
		for(i in a) {
			var a1 = a[i];
			if(a1.name && a1.filename && a1.contenttype && a1.content) {
				ret += 'Content-Disposition: form-data; name="' + encodeURIComponent(a1.name) + '";' + 
						' filename="' + encodeURIComponent(a1.filename) + '"' + "\r\n";
				ret += 'Content-Type: ' + a1.contenttype + "\r\n\r\n";
				ret += a1.content + "\r\n";
				ret += '--' + this._boundary + "\r\n";
			} else {
				for(j in a1) {
					ret += 'Content-Disposition: form-data; name="' + encodeURIComponent(j) + '"' + "\r\n\r\n";
					ret += a1[j] + "\r\n";
					ret += '--' + this._boundary + "\r\n";
				}
			}
		}
		return ret;
	}
	
};

console.log('.MakeRandomStr:');
console.log(MakePostStr.MakeRandomStr(20));

console.log('');
console.log(' * * * * *');
console.log('');

console.log('.MakePostStr:');
console.log(MakePostStr.MakePostStr({
	name1: 'val<1>',
	name2: '"val/2\\'
}));

console.log('');
console.log(' * * * * *');
console.log('');

console.log('.MakePostMultipartStr');
console.log(MakePostStr.MakePostMultipartStr(
	[
		{
			name1: 'val<1>',
			name2: '"val/2\\'
		},
		{
			name: 'file',
			filename: 'file.txt',
			contenttype: 'plain/text',
			content: 'file content' + "\n" + 'one more line'
		}
	]
));

phantom.exit();
