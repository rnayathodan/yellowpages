exports.loadDB=null;
exports.nextLinkCallBack=null;
/*
 * parser: parse's the html content for data with specific identifiers
 * data includes name, address and telephone no.
 * @param {String} data
 * @returns null
 * @api public
 */
exports.parser=function(data, nextLinkCallBack){
	
	//Since jsdom not working manually fetching data
	//Get next link
	exports.nextLink="";
	exports.nextLinkCallBack=nextLinkCallBack;
	
	//Find the next url link 
	temp=data.substr(data.indexOf("<link rel=\"next\""));
	exports.nextLink=temp.split("\n")[0].split("\"")[3];
	
	rec_pos=temp.indexOf("<div class=\"serp_tp_list");
	dataArr=new Array();
	
	while(rec_pos>-1){
		temp=temp.substr(rec_pos);
	
		//Find the name of the business entity
		temp=temp.substr(temp.indexOf("<h2 class=\"listingName\">"));
		fname=temp.split(">")[1].split("<")[0];
	
		//Find the phone details
		temp=temp.substr(temp.indexOf("<div class=\"phoneDetails\">")+26);
		tel=temp.substr(0, temp.indexOf("</div>"));
		
		//Find the address
		temp=temp.substr(temp.indexOf("<p class=\"location\">")+20);
		loc=temp.substr(0, temp.indexOf("</p>"));
	
		//Update the data Array
		dataArr[dataArr.length]=new Array();
		dataArr[dataArr.length-1]["name"]=fname;
		dataArr[dataArr.length-1]["tel"]=tel;
		dataArr[dataArr.length-1]["loc"]=loc;
		
		rec_pos=temp.indexOf("<div class=\"serp_tp_list");
		
	}
	
	//Load the data  Array in mongoDB 
	exports.loadDB(dataArr, exports.Done);
	
	
}

exports.Done=function(){
	
	if(exports.nextLink.length<=0){
		return;
	}
	exports.nextLinkCallBack(exports.nextLink);
}

/*
//Run some jQuery on a html fragment
var jsdom = require("jsdom");

jsdom.env(
  '<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>',
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    console.log("contents of a.the-link:", window.$("a.the-link").text());
  }
);


// Print all of the news items on hackernews
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./jquery.js", "utf-8");

jsdom.env({
  url: "http://news.ycombinator.com/",
  src: [jquery],
  done: function (errors, window) {
    var $ = window.$;
    console.log("HN Links");
    $("td.title:not(:last) a").each(function () {
      console.log(" -", $(this).text());
    });
  }
});

*/