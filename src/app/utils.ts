import _ from "lodash";

const getFields = function (collection, field) {
    return _.map(collection, d => d[field]);
};
const getUniqueFields = function (collection, field) {
    return _.uniq(_.map(collection, d => d[field]));
};
const normalizeColor = function (color) {
    if (color.toLowerCase() === "green") return "rgba(50, 172, 45, 0.97)";
    else if (color.toLowerCase() === "orange") return "rgba(237, 129, 40, 0.89)";
    else if (color.toLowerCase() === "red") return "rgba(245, 54, 54, 0.9)";
    else return color.toLowerCase();
}
const ini2json = function(data){
    // https://stackoverflow.com/a/12452845
    data = "" + data;
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/[\r\n]+/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            if(section){
                value[section][match[1]] = match[2];
            }else{
                value[match[1]] = match[2];
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
}
export {
    getFields,
    getUniqueFields,
    normalizeColor,
    ini2json
};