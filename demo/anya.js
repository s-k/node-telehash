var fs = require("fs");
var tele = require("../telehash");

// what is our operator, pass in or replace this value
var opaddress = process.argv[2];

// load up our private key
var ckeys = require("./anya.json");

// start up our client hashname in the same space
var client = tele.hashname("testing.private", ckeys);

// provide the operator(s) for this hashname
client.setOperators([opaddress]);

// allow an http proxy
client.setProxy({host:"jeremie.com", port:80});

// ask for ourselves, which will query the operator
client.doVerify(client.hashname, function(err, pubkey){
	if(err) return console.log("failed to find our hashname in this space:", err);
	if(pubkey !== ckeys.publicKey) return console.log("odd, our keys didn't match", pubkey, ckeys.publicKey); 
	console.log("great, we're connected! our address is", client.address);
	client.doLine(opaddress.split(",")[0], function(err){
  	if(err) return console.log("failed to open line:", err);
	  console.log("line opened");
	});
});
