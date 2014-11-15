/**
 * Created by Chaquotay on 15.11.2014.
 */

function GeoHashing(latStart, lonStart){
    var m = this;
    var fixedLen = 6;

    var lpad = function(value, padding, len) {
        var text = value.toString();
        while(text.length < len) {
            text = padding + text;
        }
        return text;
    };

    var parseHexFraction = function(str)
    {
        // Based on idea from http://stackoverflow.com/a/5055819
        var radix = 16;
        return parseInt(str, radix) / Math.pow(radix, str.length);
    };

    m.calculate = function(date, dow){
        var result = {};
        var year = date.getFullYear().toString();
        var month = lpad((date.getMonth()+1).toString(), '0', 2);
        var day = lpad(date.getDate().toString(), '0', 2);
        var dowText = dow.toFixed(2).toString();
        var text = [year, month, day, dowText].join('-');
        result.seed = text;
        var hash = result.hash = CryptoJS.MD5(result.seed).toString(); // TODO: what is the real return type?!?
        var hexLat = hash.substr(0, 16);
        result.hexLatitude = hexLat;
        var lat = result.decimalLatitude = parseHexFraction(hexLat).toFixed(fixedLen).toString().substring(2);
        var hexLon = hash.substr(16,16);
        result.hexLongitude = hexLon;
        var lon = result.decimalLongitude = parseHexFraction(hexLon).toFixed(fixedLen).toString().substring(2);

        result.latitude = parseFloat(latStart.toFixed(0)+"."+lat);
        result.longitude = parseFloat(lonStart.toFixed(0)+ "." +lon);
        return result;
    };
}
