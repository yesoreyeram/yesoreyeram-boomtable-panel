"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var utils;
    return {
        setters: [],
        execute: function () {
            _export("utils", utils = {
                getUniqueFields: function getUniqueFields(collection, field) {
                    return _.uniq(_.map(collection, function (d) {
                        return d[field];
                    }));
                },
                normalizeColor: function normalizeColor(color) {
                    if (color.toLowerCase() === "green") return "rgba(50, 172, 45, 0.97)";else if (color.toLowerCase() === "orange") return "rgba(237, 129, 40, 0.89)";else if (color.toLowerCase() === "red") return "rgba(245, 54, 54, 0.9)";else return color.toLowerCase();
                }
            });

            _export("utils", utils);
        }
    };
});
//# sourceMappingURL=utils.js.map
