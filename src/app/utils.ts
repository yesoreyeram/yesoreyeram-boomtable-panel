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
export {
    getFields,
    getUniqueFields,
    normalizeColor
};