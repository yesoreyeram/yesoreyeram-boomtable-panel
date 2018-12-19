System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, getFields, getUniqueFields, normalizeColor, replaceTokens, getActualNameWithoutTokens;
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
            replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value.split(" ").map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        var icon = a.replace(/\_/g, "").split(",")[0];
                        var color = a.indexOf(",") > -1 ? " style=\"color:" + normalizeColor(a.replace(/\_/g, "").split(",")[1]) + "\" " : "";
                        var repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
                        a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                    }
                    else if (a.startsWith("_img-") && a.endsWith("_")) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace("_img-", "").split(",")[0];
                        var imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                        var imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
                        var repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                }).join(" ");
                return value;
            };
            exports_1("replaceTokens", replaceTokens);
            getActualNameWithoutTokens = function (value) {
                if (!value) {
                    return value + "";
                }
                value = value + "";
                return value.split(" ").map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        a = "";
                    }
                    else if (a.startsWith("_img-") && a.endsWith("_")) {
                        a = "";
                    }
                    return a;
                }).join(" ");
            };
            exports_1("getActualNameWithoutTokens", getActualNameWithoutTokens);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3pDLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQzs7WUFDSSxlQUFlLEdBQUcsVUFBVSxVQUFVLEVBQUUsS0FBSztnQkFDL0MsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBUSxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7O1lBQ0ksY0FBYyxHQUFHLFVBQVUsS0FBSztnQkFDbEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO29CQUNqQyxPQUFPLHlCQUF5QixDQUFDO2lCQUNwQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7b0JBQ3pDLE9BQU8sMEJBQTBCLENBQUM7aUJBQ3JDO3FCQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDdEMsT0FBTyx3QkFBd0IsQ0FBQztpQkFDbkM7cUJBQU07b0JBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQUU7WUFDMUMsQ0FBQyxDQUFDOztZQUNJLGFBQWEsR0FBRyxVQUFVLEtBQUs7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQUUsT0FBTyxLQUFLLENBQUM7aUJBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixL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O1lBQ2pCLENBQUMsQ0FBQzs7WUFDSSwwQkFBMEIsR0FBRyxVQUFVLEtBQUs7Z0JBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQUUsT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2lCQUFFO2dCQUNsQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO3lCQUFNLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNqRCxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmNvbnN0IGdldEZpZWxkcyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBmaWVsZCkge1xuICAgIHJldHVybiBfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbZmllbGRdKTtcbn07XG5jb25zdCBnZXRVbmlxdWVGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZmllbGQpIHtcbiAgICByZXR1cm4gXy51bmlxKF8ubWFwKGNvbGxlY3Rpb24sIGQgPT4gZFtmaWVsZF0pKTtcbn07XG5jb25zdCBub3JtYWxpemVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcImdyZWVuXCIpIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYSg1MCwgMTcyLCA0NSwgMC45NylcIjtcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwib3JhbmdlXCIpIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYSgyMzcsIDEyOSwgNDAsIDAuODkpXCI7XG4gICAgfSBlbHNlIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcInJlZFwiKSB7XG4gICAgICAgIHJldHVybiBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIjtcbiAgICB9IGVsc2UgeyByZXR1cm4gY29sb3IudG9Mb3dlckNhc2UoKTsgfVxufTtcbmNvbnN0IHJlcGxhY2VUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLm1hcChhID0+IHtcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcbiAgICAgICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gYS5pbmRleE9mKFwiLFwiKSA+IC0xID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzFdKX1cIiBgIDogXCJcIjtcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyArKGEucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVsyXSkgOiAxO1xuICAgICAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xuICAgICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcbiAgICAgICAgICAgIGxldCBpbWdXaWR0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMV0gOiBcIjIwcHhcIjtcbiAgICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XG4gICAgICAgICAgICBsZXQgcmVwZWF0Q291bnQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAzID8gKyhhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbM10pIDogMTtcbiAgICAgICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KHJlcGVhdENvdW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9KS5qb2luKFwiIFwiKTtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuY29uc3QgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZSArIFwiXCI7IH1cbiAgICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoXCIgXCIpLm1hcChhID0+IHtcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcbiAgICAgICAgICAgIGEgPSBgYDtcbiAgICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xuICAgICAgICAgICAgYSA9IGBgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xufTtcbmV4cG9ydCB7XG4gICAgZ2V0RmllbGRzLFxuICAgIGdldFVuaXF1ZUZpZWxkcyxcbiAgICBub3JtYWxpemVDb2xvcixcbiAgICByZXBsYWNlVG9rZW5zLFxuICAgIGdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zXG59O1xuIl19