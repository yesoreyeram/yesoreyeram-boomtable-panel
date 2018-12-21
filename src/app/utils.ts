import _ from "lodash";

const getFields = function (collection, field) {
    return _.map(collection, d => d[field]);
};
const limitText = function (text, maxlength) {
    if (text.split('').length > maxlength) {
        text = text.substring(0, maxlength - 3) + "...";
    }
    return text;
};
export {
    getFields,
    limitText
};
