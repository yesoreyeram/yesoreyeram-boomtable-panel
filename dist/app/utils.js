System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, getFields, getUniqueFields, normalizeColor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            getFields = function (collection, field) {
                return lodash_1.default.map(collection, function (d) { return d[field]; });
            };
            exports_1("getFields", getFields);
            getUniqueFields = function (collection, field) {
                return lodash_1.default.uniq(lodash_1.default.map(collection, function (d) { return d[field]; }));
            };
            exports_1("getUniqueFields", getUniqueFields);
            normalizeColor = function (color) {
                if (color.toLowerCase() === "green") {
                    return "rgba(50, 172, 45, 0.97)";
                }
                else if (color.toLowerCase() === "orange") {
                    return "rgba(237, 129, 40, 0.89)";
                }
                else if (color.toLowerCase() === "red") {
                    return "rgba(245, 54, 54, 0.9)";
                }
                else {
                    return color.toLowerCase();
                }
            };
            exports_1("normalizeColor", normalizeColor);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3pDLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQzs7WUFDSSxlQUFlLEdBQUcsVUFBVSxVQUFVLEVBQUUsS0FBSztnQkFDL0MsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBUSxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7O1lBQ0ksY0FBYyxHQUFHLFVBQVUsS0FBSztnQkFDbEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO29CQUNqQyxPQUFPLHlCQUF5QixDQUFDO2lCQUNwQztxQkFDSSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7b0JBQ3ZDLE9BQU8sMEJBQTBCLENBQUM7aUJBQ3JDO3FCQUNJLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDcEMsT0FBTyx3QkFBd0IsQ0FBQztpQkFDbkM7cUJBQ0k7b0JBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQUU7WUFDeEMsQ0FBQyxDQUFBOztRQU1ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmNvbnN0IGdldEZpZWxkcyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBmaWVsZCkge1xuICAgIHJldHVybiBfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbZmllbGRdKTtcbn07XG5jb25zdCBnZXRVbmlxdWVGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZmllbGQpIHtcbiAgICByZXR1cm4gXy51bmlxKF8ubWFwKGNvbGxlY3Rpb24sIGQgPT4gZFtmaWVsZF0pKTtcbn07XG5jb25zdCBub3JtYWxpemVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcImdyZWVuXCIpIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYSg1MCwgMTcyLCA0NSwgMC45NylcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJvcmFuZ2VcIikge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWRcIikge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDI0NSwgNTQsIDU0LCAwLjkpXCI7XG4gICAgfVxuICAgIGVsc2UgeyByZXR1cm4gY29sb3IudG9Mb3dlckNhc2UoKTsgfVxufVxuZXhwb3J0IHtcbiAgICBnZXRGaWVsZHMsXG4gICAgZ2V0VW5pcXVlRmllbGRzLFxuICAgIG5vcm1hbGl6ZUNvbG9yXG59O1xuIl19