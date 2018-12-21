System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, getFields, limitText;
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
            limitText = function (text, maxlength) {
                if (text.split('').length > maxlength) {
                    text = text.substring(0, maxlength - 3) + "...";
                }
                return text;
            };
            exports_1("limitText", limitText);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3pDLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQzs7WUFDSSxTQUFTLEdBQUcsVUFBVSxJQUFJLEVBQUUsU0FBUztnQkFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7b0JBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUNuRDtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmNvbnN0IGdldEZpZWxkcyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBmaWVsZCkge1xuICAgIHJldHVybiBfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbZmllbGRdKTtcbn07XG5jb25zdCBsaW1pdFRleHQgPSBmdW5jdGlvbiAodGV4dCwgbWF4bGVuZ3RoKSB7XG4gICAgaWYgKHRleHQuc3BsaXQoJycpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xuICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgbWF4bGVuZ3RoIC0gMykgKyBcIi4uLlwiO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbn07XG5leHBvcnQge1xuICAgIGdldEZpZWxkcyxcbiAgICBsaW1pdFRleHRcbn07XG4iXX0=