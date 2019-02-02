var today = new Date();
var dd = today.getDate();
var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

var lastsixdays = [];

for (var i=0; i<6; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);

    lastsixdays.push( d.toJSON().slice(0,10).replace(/-/g,'/') )
}
console.log(result);