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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3pDLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQzs7WUFDSSxlQUFlLEdBQUcsVUFBVSxVQUFVLEVBQUUsS0FBSztnQkFDL0MsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBUSxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7O1lBQ0ksY0FBYyxHQUFHLFVBQVUsS0FBSztnQkFDbEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO29CQUNqQyxPQUFPLHlCQUF5QixDQUFDO2lCQUNwQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7b0JBQ3pDLE9BQU8sMEJBQTBCLENBQUM7aUJBQ3JDO3FCQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDdEMsT0FBTyx3QkFBd0IsQ0FBQztpQkFDbkM7cUJBQU07b0JBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQUU7WUFDMUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuXG5jb25zdCBnZXRGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZmllbGQpIHtcbiAgICByZXR1cm4gXy5tYXAoY29sbGVjdGlvbiwgZCA9PiBkW2ZpZWxkXSk7XG59O1xuY29uc3QgZ2V0VW5pcXVlRmllbGRzID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGZpZWxkKSB7XG4gICAgcmV0dXJuIF8udW5pcShfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbZmllbGRdKSk7XG59O1xuY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJncmVlblwiKSB7XG4gICAgICAgIHJldHVybiBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCI7XG4gICAgfSBlbHNlIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcIm9yYW5nZVwiKSB7XG4gICAgICAgIHJldHVybiBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiO1xuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWRcIikge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDI0NSwgNTQsIDU0LCAwLjkpXCI7XG4gICAgfSBlbHNlIHsgcmV0dXJuIGNvbG9yLnRvTG93ZXJDYXNlKCk7IH1cbn07XG5leHBvcnQge1xuICAgIGdldEZpZWxkcyxcbiAgICBnZXRVbmlxdWVGaWVsZHMsXG4gICAgbm9ybWFsaXplQ29sb3Jcbn07XG4iXX0=