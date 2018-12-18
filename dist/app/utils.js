System.register(["lodash"], function(exports_1) {
    var lodash_1;
    var getFields, getUniqueFields, normalizeColor;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            getFields = function (collection, field) {
                return lodash_1.default.map(collection, function (d) { return d[field]; });
            };
            getUniqueFields = function (collection, field) {
                return lodash_1.default.uniq(lodash_1.default.map(collection, function (d) { return d[field]; }));
            };
            normalizeColor = function (color) {
                if (color.toLowerCase() === "green")
                    return "rgba(50, 172, 45, 0.97)";
                else if (color.toLowerCase() === "orange")
                    return "rgba(237, 129, 40, 0.89)";
                else if (color.toLowerCase() === "red")
                    return "rgba(245, 54, 54, 0.9)";
                else
                    return color.toLowerCase();
            };
            exports_1("getFields", getFields);
            exports_1("getUniqueFields", getUniqueFields);
            exports_1("normalizeColor", normalizeColor);
        }
    }
});
//# sourceMappingURL=utils.js.map