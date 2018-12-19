import _ from "lodash";

const getFields = function (collection, field) {
    return _.map(collection, d => d[field]);
};
const getUniqueFields = function (collection, field) {
    return _.uniq(_.map(collection, d => d[field]));
};
const normalizeColor = function (color) {
    if (color.toLowerCase() === "green") {
        return "rgba(50, 172, 45, 0.97)";
    } else if (color.toLowerCase() === "orange") {
        return "rgba(237, 129, 40, 0.89)";
    } else if (color.toLowerCase() === "red") {
        return "rgba(245, 54, 54, 0.9)";
    } else { return color.toLowerCase(); }
};
const replaceTokens = function (value) {
    if (!value) { return value; }
    value = value + "";
    value = value.split(" ").map(a => {
        if (a.startsWith("_fa-") && a.endsWith("_")) {
            let icon = a.replace(/\_/g, "").split(",")[0];
            let color = a.indexOf(",") > -1 ? ` style="color:${normalizeColor(a.replace(/\_/g, "").split(",")[1])}" ` : "";
            let repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
            a = `<i class="fa ${icon}" ${color}></i> `.repeat(repeatCount);
        } else if (a.startsWith("_img-") && a.endsWith("_")) {
            a = a.slice(0, -1);
            let imgUrl = a.replace("_img-", "").split(",")[0];
            let imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
            let imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
            let repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
            a = `<img width="${imgWidth}" height="${imgHeight}" src="${imgUrl}"/>`.repeat(repeatCount);
        }
        return a;
    }).join(" ");
    return value;
};
const getActualNameWithoutTokens = function (value) {
    if (!value) { return value + ""; }
    value = value + "";
    return value.split(" ").map(a => {
        if (a.startsWith("_fa-") && a.endsWith("_")) {
            a = ``;
        } else if (a.startsWith("_img-") && a.endsWith("_")) {
            a = ``;
        }
        return a;
    }).join(" ");
};
export {
    getFields,
    getUniqueFields,
    normalizeColor,
    replaceTokens,
    getActualNameWithoutTokens
};
