/**
 * Created by Chaquotay on 19.11.2014.
 */

Date.prototype.toHyphenedString = function() {
    var date = this;
    var lpad = function(value, padding, len) {
        var text = value.toString();
        while(text.length < len) {
            text = padding + text;
        }
        return text;
    };

    var year = date.getFullYear().toString();
    var month = lpad((date.getMonth()+1).toString(), '0', 2);
    var day = lpad(date.getDate().toString(), '0', 2);
    return [year, month, day].join("-");
}

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

// http://stackoverflow.com/a/13052187
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
