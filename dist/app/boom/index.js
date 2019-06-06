System.register(["./BoomUtils", "./BoomTimeBasedThreshold", "./BoomPattern", "./BoomSeries", "./BoomOutput"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (BoomUtils_1_1) {
                exports_1({
                    "normalizeColor": BoomUtils_1_1["normalizeColor"],
                    "replaceTokens": BoomUtils_1_1["replaceTokens"],
                    "getActualNameWithoutTokens": BoomUtils_1_1["getActualNameWithoutTokens"],
                    "getDecimalsForValue": BoomUtils_1_1["getDecimalsForValue"],
                    "getItemBasedOnThreshold": BoomUtils_1_1["getItemBasedOnThreshold"]
                });
            },
            function (BoomTimeBasedThreshold_1_1) {
                exports_1({
                    "BoomTimeBasedThreshold": BoomTimeBasedThreshold_1_1["BoomTimeBasedThreshold"]
                });
            },
            function (BoomPattern_1_1) {
                exports_1({
                    "BoomPattern": BoomPattern_1_1["BoomPattern"]
                });
            },
            function (BoomSeries_1_1) {
                exports_1({
                    "BoomSeries": BoomSeries_1_1["BoomSeries"]
                });
            },
            function (BoomOutput_1_1) {
                exports_1({
                    "BoomOutput": BoomOutput_1_1["BoomOutput"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2Jvb20vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IElCb29tUGF0dGVybiwgSUJvb21TZXJpZXMsIElCb29tVGltZUJhc2VkVGhyZXNob2xkLCBJQm9vbVJlbmRlcmluZ09wdGlvbnMsIElCb29tVGFibGUsIElCb29tSFRNTCwgSUJvb21DZWxsRGV0YWlscywgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL0Jvb20uaW50ZXJmYWNlXCI7XHJcbmV4cG9ydCB7IG5vcm1hbGl6ZUNvbG9yLCByZXBsYWNlVG9rZW5zLCBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucywgZ2V0RGVjaW1hbHNGb3JWYWx1ZSwgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQgfSBmcm9tIFwiLi9Cb29tVXRpbHNcIjtcclxuZXhwb3J0IHsgQm9vbVRpbWVCYXNlZFRocmVzaG9sZCB9IGZyb20gXCIuL0Jvb21UaW1lQmFzZWRUaHJlc2hvbGRcIjtcclxuZXhwb3J0IHsgQm9vbVBhdHRlcm4gfSBmcm9tIFwiLi9Cb29tUGF0dGVyblwiO1xyXG5leHBvcnQgeyBCb29tU2VyaWVzIH0gZnJvbSBcIi4vQm9vbVNlcmllc1wiO1xyXG5leHBvcnQgeyBCb29tT3V0cHV0IH0gZnJvbSBcIi4vQm9vbU91dHB1dFwiO1xyXG4iXX0=