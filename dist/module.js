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
                    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    _this.panel.activePatternIndex = _this.panel.activePatternIndex === -1 ? _this.panel.patterns.length : _this.panel.activePatternIndex;
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
                    this.addEditorTab("Options", "public/plugins/" + config_1.plugin_id + "/partials/options.html", 3);
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
                        return new Boom_1.BoomSeries(seriesData, _this.panel.defaultPattern, _this.panel.patterns, {
                            debug_mode: _this.panel.debug_mode,
                            row_col_wrapper: _this.panel.row_col_wrapper || "_"
                        });
                    });
                    var renderingdata = app_1.getRenderingData(app_1.seriesToTable(outputdata), {
                        default_title_for_rows: this.panel.default_title_for_rows || config_1.config.default_title_for_rows,
                        hide_first_column: this.panel.hide_first_column,
                        hide_headers: this.panel.hide_headers
                    });
                    this.elem.find("#boomtable_output_body_headers").html("<br/>" + renderingdata.headers);
                    this.elem.find('#boomtable_output_body').html("" + renderingdata.body);
                    this.elem.find('#boomtable_output_body_debug').html(this.panel.debug_mode ? app_1.getDebugData(outputdata) : "");
                    this.elem.find("[data-toggle='tooltip']").tooltip({
                        boundary: "scrollParent"
                    });
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 111 : this.ctrl.height - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFTakQsOEJBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQVF6QjtvQkFoQk0sZUFBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7b0JBQzVCLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxzQkFBZ0IsR0FBRywyQkFBa0IsQ0FBQztvQkFPM0MsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxlQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLG9CQUFjLENBQUM7b0JBQ3hFLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDckUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENB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QUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGtCQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUMzRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDaEQsUUFBUSxFQUFFLGNBQWM7cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDOUYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vYXBwL3V0aWxzXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRQYXR0ZXJuLCBzZXJpZXNUb1RhYmxlLCBnZXRSZW5kZXJpbmdEYXRhLCBnZXREZWJ1Z0RhdGEgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCB7IHBsdWdpbl9pZCwgdmFsdWVfbmFtZV9vcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBCb29tU2VyaWVzIH0gZnJvbSBcIi4vYXBwL0Jvb21cIjtcclxuXHJcbmxvYWRQbHVnaW5Dc3Moe1xyXG4gIGRhcms6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5kYXJrLmNzc2AsXHJcbiAgbGlnaHQ6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5saWdodC5jc3NgXHJcbn0pO1xyXG5cclxuY2xhc3MgR3JhZmFuYUJvb21UYWJsZUN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHB1YmxpYyBsaW1pdFRleHQgPSB1dGlscy5saW1pdFRleHQ7XHJcbiAgcHVibGljIHVuaXRGb3JtYXRzID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgcHVibGljIHZhbHVlTmFtZU9wdGlvbnMgPSB2YWx1ZV9uYW1lX29wdGlvbnM7XHJcbiAgcHVibGljIGRhdGFSZWNlaXZlZDogYW55O1xyXG4gIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgcHVibGljIGVsZW06IGFueTtcclxuICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3Rvcikge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCBjb25maWcucGFuZWxEZWZhdWx0cyk7XHJcbiAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybjtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtc25hcHNob3QtbG9hZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEgPyB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA6IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4O1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKSB7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMubWFwKHBhdHRlcm4gPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIG9uRGF0YVJlY2VpdmVkKGRhdGEpIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkluaXRFZGl0TW9kZSgpIHtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiUGF0dGVybnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9wYXR0ZXJucy5odG1sYCwgMik7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIk9wdGlvbnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9vcHRpb25zLmh0bWxgLCAzKTtcclxuICB9XHJcbiAgcHVibGljIGFkZFBhdHRlcm4oKSB7XHJcbiAgICBsZXQgbmV3UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybih7XHJcbiAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGF0dGVybihpbmRleCkge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBtb3ZlUGF0dGVybihkaXJlY3Rpb24sIGluZGV4KSB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4ICsgMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbG9uZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0pO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNvcGllZFBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcclxuICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcclxuICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICB0aGlzLmF0dHJzID0gYXR0cnM7XHJcbiAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5kYXRhUmVjZWl2ZWQpIHtcclxuICAgIGxldCBvdXRwdXRkYXRhID0gdGhpcy5kYXRhUmVjZWl2ZWQubWFwKHNlcmllc0RhdGEgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IEJvb21TZXJpZXMoc2VyaWVzRGF0YSwgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgdGhpcy5wYW5lbC5wYXR0ZXJucywge1xyXG4gICAgICAgIGRlYnVnX21vZGU6IHRoaXMucGFuZWwuZGVidWdfbW9kZSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyIHx8IFwiX1wiXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgcmVuZGVyaW5nZGF0YSA9IGdldFJlbmRlcmluZ0RhdGEoc2VyaWVzVG9UYWJsZShvdXRwdXRkYXRhKSwge1xyXG4gICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgY29uZmlnLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsXHJcbiAgICAgIGhpZGVfZmlyc3RfY29sdW1uOiB0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uLFxyXG4gICAgICBoaWRlX2hlYWRlcnM6IHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzXCIpLmh0bWwoYDxici8+YCArIHJlbmRlcmluZ2RhdGEuaGVhZGVycyk7XHJcbiAgICB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keScpLmh0bWwoYGAgKyByZW5kZXJpbmdkYXRhLmJvZHkpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWcnKS5odG1sKHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IGdldERlYnVnRGF0YShvdXRwdXRkYXRhKSA6IGBgKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiW2RhdGEtdG9nZ2xlPSd0b29sdGlwJ11cIikudG9vbHRpcCh7XHJcbiAgICAgIGJvdW5kYXJ5OiBcInNjcm9sbFBhcmVudFwiXHJcbiAgICB9KTtcclxuICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IHRoaXMuY3RybC5oZWlnaHQgLSAxMTEgOiB0aGlzLmN0cmwuaGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19