/**
*	Fetch Business details from yellowpages.in
*	Load HTML in Dom and extract Information
*	Store Information in MongoDB
* @dependencies http, mongodb
*
**/


var baseurl="http://mumbai.yellowpages.co.in/Doctors";
var fetchfile=require("./lib/fetchfile");
var parsehtml=require("./lib/parsehtml");
var mydb=require("./lib/db");

//Define Callbacks
fetchfile.htmlParser=parsehtml.parser;
parsehtml.loadDB=mydb.loadData;

//Start with the baseurl
fetchfile.Load(baseurl, loadURL);




/**  
* loadURL: Loads a yellowpages.in url 
*  
* 
* @param {String} url
* @returns null
* @author Robin Nayathodan
* 
**/

function loadURL(url){ 
	console.log("Loading url"+url);
	fetchfile.Load(url, loadURL);
}