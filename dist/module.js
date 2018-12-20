System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/utils", "./app/app", "./app/config", "./app/Boom"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, kbn_1, sdk_1, utils, app_1, config_1, Boom_1, GrafanaBoomTableCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (Boom_1_1) {
                Boom_1 = Boom_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.plugin_id + "/css/default.light.css"
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.limitText = utils.limitText;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.valueNameOptions = config_1.value_name_options;
                    lodash_1.default.defaults(_this.panel, config_1.config.panelDefaults);
                    _this.panel.defaultPattern = _this.panel.defaultPattern || app_1.defaultPattern;
                    _this.updatePrototypes();
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                GrafanaBoomTableCtrl.prototype.updatePrototypes = function () {
                    Object.setPrototypeOf(this.panel.defaultPattern, Boom_1.BoomPattern.prototype);
                    this.panel.patterns.map(function (pattern) {
                        Object.setPrototypeOf(pattern, Boom_1.BoomPattern.prototype);
                        return pattern;
                    });
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Patterns", "public/plugins/" + config_1.plugin_id + "/partials/patterns.html", 2);
                    this.addEditorTab("Time based thresholds & Filters", "public/plugins/" + config_1.plugin_id + "/partials/patterns-advanced-options.html", 3);
                    this.addEditorTab("Options", "public/plugins/" + config_1.plugin_id + "/partials/options.html", 4);
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = new Boom_1.BoomPattern({
                        row_col_wrapper: this.panel.row_col_wrapper
                    });
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.patterns.length - 1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[index];
                    if (direction === "UP") {
                        this.panel.patterns[index] = this.panel.patterns[index - 1];
                        this.panel.patterns[index - 1] = tempElement;
                        this.panel.activePatternIndex = index - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.patterns[index] = this.panel.patterns[index + 1];
                        this.panel.patterns[index + 1] = tempElement;
                        this.panel.activePatternIndex = index + 1;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.clonePattern = function (index) {
                    var copiedPattern = Object.assign({}, this.panel.patterns[index]);
                    Object.setPrototypeOf(copiedPattern, Boom_1.BoomPattern.prototype);
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    var outputdata = this.dataReceived.map(function (seriesData) {
                        return new Boom_1.BoomSeries(seriesData, _this.panel.defaultPattern, _this.panel.patterns, {});
                    });
                    var renderingdata = app_1.getRenderingData(app_1.seriesToTable(outputdata), {
                        default_title_for_rows: this.panel.default_title_for_rows || config_1.config.default_title_for_rows,
                        hide_first_column: this.panel.hide_first_column,
                        hide_headers: this.panel.hide_headers
                    });
                    this.elem.find("#boomtable_output_body_headers").html("<br/>" + renderingdata.headers);
                    this.elem.find('#boomtable_output_body').html("" + renderingdata.body);
                    this.elem.find('#boomtable_output_body_debug').html("");
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 71 : this.ctrl.height - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFTakQsOEJBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQU16QjtvQkFkTSxlQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDNUIsaUJBQVcsR0FBRyxhQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ25DLHNCQUFnQixHQUFHLDJCQUFrQixDQUFDO29CQU8zQyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLGVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksb0JBQWMsQ0FBQztvQkFDeEUsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDbkUsQ0FBQztnQkFDTywrQ0FBZ0IsR0FBeEI7b0JBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFD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QUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGtibiBmcm9tICdhcHAvY29yZS91dGlscy9rYm4nO1xyXG5pbXBvcnQgeyBsb2FkUGx1Z2luQ3NzLCBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9hcHAvdXRpbHNcIjtcclxuaW1wb3J0IHsgZGVmYXVsdFBhdHRlcm4sIHNlcmllc1RvVGFibGUsIGdldFJlbmRlcmluZ0RhdGEgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCB7IHBsdWdpbl9pZCwgdmFsdWVfbmFtZV9vcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBCb29tU2VyaWVzIH0gZnJvbSBcIi4vYXBwL0Jvb21cIjtcclxuXHJcbmxvYWRQbHVnaW5Dc3Moe1xyXG4gIGRhcms6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5kYXJrLmNzc2AsXHJcbiAgbGlnaHQ6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5saWdodC5jc3NgXHJcbn0pO1xyXG5cclxuY2xhc3MgR3JhZmFuYUJvb21UYWJsZUN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHB1YmxpYyBsaW1pdFRleHQgPSB1dGlscy5saW1pdFRleHQ7XHJcbiAgcHVibGljIHVuaXRGb3JtYXRzID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgcHVibGljIHZhbHVlTmFtZU9wdGlvbnMgPSB2YWx1ZV9uYW1lX29wdGlvbnM7XHJcbiAgcHVibGljIGRhdGFSZWNlaXZlZDogYW55O1xyXG4gIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgcHVibGljIGVsZW06IGFueTtcclxuICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCBjb25maWcucGFuZWxEZWZhdWx0cyk7XHJcbiAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybjtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpIHtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLCBCb29tUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5tYXAocGF0dGVybiA9PiB7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihwYXR0ZXJuLCBCb29tUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgICByZXR1cm4gcGF0dGVybjtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgb25EYXRhUmVjZWl2ZWQoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG9uSW5pdEVkaXRNb2RlKCkge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxgLCAyKTtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiVGltZSBiYXNlZCB0aHJlc2hvbGRzICYgRmlsdGVyc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLWFkdmFuY2VkLW9wdGlvbnMuaHRtbGAsIDMpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJPcHRpb25zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCwgNCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm4gPSBuZXcgQm9vbVBhdHRlcm4oe1xyXG4gICAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyXHJcbiAgICB9KTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbW92ZVBhdHRlcm4oZGlyZWN0aW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgY2xvbmVQYXR0ZXJuKGluZGV4KSB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjb3BpZWRQYXR0ZXJuLCBCb29tUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKGNvcGllZFBhdHRlcm4pO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICBsZXQgb3V0cHV0ZGF0YSA9IHRoaXMuZGF0YVJlY2VpdmVkLm1hcChzZXJpZXNEYXRhID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBCb29tU2VyaWVzKHNlcmllc0RhdGEsIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4sIHRoaXMucGFuZWwucGF0dGVybnMsIHt9KTtcclxuICAgIH0pO1xyXG4gICAgbGV0IHJlbmRlcmluZ2RhdGEgPSBnZXRSZW5kZXJpbmdEYXRhKHNlcmllc1RvVGFibGUob3V0cHV0ZGF0YSksIHtcclxuICAgICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLFxyXG4gICAgICBoaWRlX2ZpcnN0X2NvbHVtbjogdGhpcy5wYW5lbC5oaWRlX2ZpcnN0X2NvbHVtbixcclxuICAgICAgaGlkZV9oZWFkZXJzOiB0aGlzLnBhbmVsLmhpZGVfaGVhZGVyc1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIiNib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc1wiKS5odG1sKGA8YnIvPmAgKyByZW5kZXJpbmdkYXRhLmhlYWRlcnMpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKS5odG1sKGBgICsgcmVuZGVyaW5nZGF0YS5ib2R5KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJykuaHRtbChgYCk7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyB0aGlzLmN0cmwuaGVpZ2h0IC0gNzEgOiB0aGlzLmN0cmwuaGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19