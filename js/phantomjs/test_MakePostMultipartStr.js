phantom.injectJs('MakePostMultipartStr.js');

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
