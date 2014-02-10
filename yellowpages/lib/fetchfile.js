exports.htmlParser=null;
exports.nextLinkLoad=null;
var http=require("http");


/*
 * Load: Loads the url and buffers the html content, 
 * later call's the html parser  
 * 
 * @param {String} url
 * @returns null
 * @api public
 */
exports.Load=function(url, nextLinkCallBack){
	exports.nextLinkLoad=nextLinkCallBack;
	exports.buffer="";
	var req=http.get(url, function(res){

		res.on('data', function(chunk){
			exports.buffer+=chunk.toString();

		}); 
		res.on('error', function(){
			return;
		});
		res.on('end', function(){
			exports.htmlParser(exports.buffer, nextLinkCallBack );
		});
	});
	
}

