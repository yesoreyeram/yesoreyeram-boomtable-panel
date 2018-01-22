const utils = {
    getUniqueFields: function (collection, field) {
        return _.uniq(_.map(collection, d => d[field]));
    },
    normalizeColor: function (color) {
        if (color.toLowerCase() === "green") return "rgba(50, 172, 45, 0.97)";
        else if (color.toLowerCase() === "orange") return "rgba(237, 129, 40, 0.89)";
        else if (color.toLowerCase() === "red") return "rgba(245, 54, 54, 0.9)";
        else return color.toLowerCase();
    }
}
export {
    utils
}