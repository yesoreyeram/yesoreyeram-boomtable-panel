System.register(["lodash"], function(exports_1) {
    var lodash_1;
    var getFields, getUniqueFields, normalizeColor, ini2json;
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
            ini2json = function (data) {
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
                lines.forEach(function (line) {
                    if (regex.comment.test(line)) {
                        return;
                    }
                    else if (regex.param.test(line)) {
                        var match = line.match(regex.param);
                        if (section) {
                            value[section][match[1]] = match[2];
                        }
                        else {
                            value[match[1]] = match[2];
                        }
                    }
                    else if (regex.section.test(line)) {
                        var match = line.match(regex.section);
                        value[match[1]] = {};
                        section = match[1];
                    }
                    else if (line.length == 0 && section) {
                        section = null;
                    }
                    ;
                });
                return value;
            };
            exports_1("getFields", getFields);
            exports_1("getUniqueFields", getUniqueFields);
            exports_1("normalizeColor", normalizeColor);
            exports_1("ini2json", ini2json);
        }
    }
});
//# sourceMappingURL=utils.js.map