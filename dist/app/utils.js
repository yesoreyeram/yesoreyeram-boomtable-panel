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
                if (color.toLowerCase() === "green")
                    return "rgba(50, 172, 45, 0.97)";
                else if (color.toLowerCase() === "orange")
                    return "rgba(237, 129, 40, 0.89)";
                else if (color.toLowerCase() === "red")
                    return "rgba(245, 54, 54, 0.9)";
                else
                    return color.toLowerCase();
            };
            exports_1("normalizeColor", normalizeColor);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3pDLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQzs7WUFDSSxlQUFlLEdBQUcsVUFBVSxVQUFVLEVBQUUsS0FBSztnQkFDL0MsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBUSxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7O1lBQ0ksY0FBYyxHQUFHLFVBQVUsS0FBSztnQkFDbEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTztvQkFBRSxPQUFPLHlCQUF5QixDQUFDO3FCQUNqRSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRO29CQUFFLE9BQU8sMEJBQTBCLENBQUM7cUJBQ3hFLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUs7b0JBQUUsT0FBTyx3QkFBd0IsQ0FBQzs7b0JBQ25FLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BDLENBQUMsQ0FBQTs7UUFLQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuXG5jb25zdCBnZXRGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZmllbGQpIHtcbiAgICByZXR1cm4gXy5tYXAoY29sbGVjdGlvbiwgZCA9PiBkW2ZpZWxkXSk7XG59O1xuY29uc3QgZ2V0VW5pcXVlRmllbGRzID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGZpZWxkKSB7XG4gICAgcmV0dXJuIF8udW5pcShfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbZmllbGRdKSk7XG59O1xuY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJncmVlblwiKSByZXR1cm4gXCJyZ2JhKDUwLCAxNzIsIDQ1LCAwLjk3KVwiO1xuICAgIGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwib3JhbmdlXCIpIHJldHVybiBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiO1xuICAgIGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwicmVkXCIpIHJldHVybiBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIjtcbiAgICBlbHNlIHJldHVybiBjb2xvci50b0xvd2VyQ2FzZSgpO1xufVxuZXhwb3J0IHtcbiAgICBnZXRGaWVsZHMsXG4gICAgZ2V0VW5pcXVlRmllbGRzLFxuICAgIG5vcm1hbGl6ZUNvbG9yXG59OyJdfQ==