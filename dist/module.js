System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/boom/index", "./app/config", "./app/app"], function (exports_1, context_1) {
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
    var lodash_1, kbn_1, sdk_1, index_1, config_1, app_1, GrafanaBoomTableCtrl;
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
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.plugin_id + "/css/default.light.css"
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.valueNameOptions = config_1.value_name_options;
                    _this.textAlignmentOptions = config_1.textAlignmentOptions;
                    _this.sorting_props = {
                        col_index: -1,
                        direction: "desc"
                    };
                    lodash_1.default.defaults(_this.panel, config_1.config.panelDefaults);
                    _this.panel.defaultPattern = _this.panel.defaultPattern || app_1.defaultPattern;
                    _this.$sce = $sce;
                    _this.templateSrv = $injector.get("templateSrv");
                    _this.timeSrv = $injector.get("timeSrv");
                    _this.updatePrototypes();
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    _this.panel.activePatternIndex = _this.panel.activePatternIndex === -1 ? _this.panel.patterns.length : _this.panel.activePatternIndex;
                    return _this;
                }
                GrafanaBoomTableCtrl.prototype.updatePrototypes = function () {
                    Object.setPrototypeOf(this.panel.defaultPattern, index_1.BoomPattern.prototype);
                    this.panel.patterns.map(function (pattern) {
                        Object.setPrototypeOf(pattern, index_1.BoomPattern.prototype);
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
                    var newPattern = new index_1.BoomPattern({
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
                    var tempElement = this.panel.patterns[Number(index)];
                    if (direction === "UP") {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) - 1];
                        this.panel.patterns[Number(index) - 1] = tempElement;
                        this.panel.activePatternIndex = Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) + 1];
                        this.panel.patterns[Number(index) + 1] = tempElement;
                        this.panel.activePatternIndex = Number(index) + 1;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.clonePattern = function (index) {
                    var copiedPattern = Object.assign({}, this.panel.patterns[Number(index)]);
                    Object.setPrototypeOf(copiedPattern, index_1.BoomPattern.prototype);
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.sortByHeader = function (headerIndex) {
                    this.sorting_props.col_index = headerIndex;
                    this.sorting_props.direction = this.sorting_props.direction === "asc" ? "desc" : "asc";
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.limitText = function (text, maxlength) {
                    if (text.split('').length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + "...";
                    }
                    return text;
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                    this.panel = ctrl.panel;
                };
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    var outputdata = this.dataReceived.map(function (seriesData) {
                        var seriesOptions = {
                            debug_mode: _this.panel.debug_mode,
                            row_col_wrapper: _this.panel.row_col_wrapper || "_"
                        };
                        return new index_1.BoomSeries(seriesData, _this.panel.defaultPattern, _this.panel.patterns, seriesOptions, _this.panel.scopedVars, _this.templateSrv, _this.timeSrv);
                    });
                    var boomTableTransformationOptions = {
                        non_matching_cells_color_bg: this.panel.non_matching_cells_color_bg,
                        non_matching_cells_color_text: this.panel.non_matching_cells_color_text,
                        non_matching_cells_text: this.panel.non_matching_cells_text,
                    };
                    var boomtabledata = app_1.seriesToTable(outputdata, boomTableTransformationOptions);
                    var renderingOptions = {
                        default_title_for_rows: this.panel.default_title_for_rows || config_1.config.default_title_for_rows,
                        hide_first_column: this.panel.hide_first_column,
                        hide_headers: this.panel.hide_headers,
                        text_alignment_firstcolumn: this.panel.text_alignment_firstcolumn,
                        text_alignment_values: this.panel.text_alignment_values
                    };
                    var boom_output = new index_1.BoomOutput(renderingOptions);
                    this.outdata = {
                        cols_found: boomtabledata.cols_found.map(function (col) { return _this.$sce.trustAsHtml(col); })
                    };
                    var renderingdata = boom_output.getDataAsHTML(boomtabledata, this.sorting_props);
                    this.elem.find('#boomtable_output_body').html("" + renderingdata.body);
                    this.elem.find('#boomtable_output_body_debug').html(this.panel.debug_mode ? boom_output.getDataAsDebugHTML(outputdata) : "");
                    this.elem.find("[data-toggle='tooltip']").tooltip({
                        boundary: "scrollParent"
                    });
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var originalHeight = this.ctrl.height;
                    if (isNaN(originalHeight)) {
                        if (this.ctrl && this.ctrl.elem && this.ctrl.elem[0] && this.ctrl.elem[0].clientHeight) {
                            originalHeight = this.ctrl.elem[0].clientHeight;
                        }
                    }
                    var maxheightofpanel = this.panel.debug_mode ? originalHeight - 111 : originalHeight - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFlakQsOEJBQVksTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJO29CQUFuQyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FXekI7b0JBekJNLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxzQkFBZ0IsR0FBRywyQkFBa0IsQ0FBQztvQkFDdEMsMEJBQW9CLEdBQUcsNkJBQW9CLENBQUM7b0JBRTVDLG1CQUFhLEdBQUc7d0JBQ3JCLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQ2IsU0FBUyxFQUFFLE1BQU07cUJBQ2xCLENBQUM7b0JBUUEsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxlQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLG9CQUFjLENBQUM7b0JBQ3hFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2hELEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDeEMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxD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RCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDdEMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7d0JBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7NEJBQ3RGLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7eUJBQ2pEO3FCQUNGO29CQUNELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7b0JBQzFGLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDekQ7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gJ2FwcC9jb3JlL3V0aWxzL2tibic7XHJcbmltcG9ydCB7IGxvYWRQbHVnaW5Dc3MsIE1ldHJpY3NQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCB7IElCb29tU2VyaWVzLCBJQm9vbVJlbmRlcmluZ09wdGlvbnMsIElCb29tVGFibGUsIElCb29tSFRNTCwgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2FwcC9ib29tL2luZGV4XCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBCb29tU2VyaWVzLCBCb29tT3V0cHV0IH0gZnJvbSBcIi4vYXBwL2Jvb20vaW5kZXhcIjtcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCB2YWx1ZV9uYW1lX29wdGlvbnMsIHRleHRBbGlnbm1lbnRPcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRQYXR0ZXJuLCBzZXJpZXNUb1RhYmxlIH0gZnJvbSBcIi4vYXBwL2FwcFwiO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxufSk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgcHVibGljIHVuaXRGb3JtYXRzID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgcHVibGljIHZhbHVlTmFtZU9wdGlvbnMgPSB2YWx1ZV9uYW1lX29wdGlvbnM7XHJcbiAgcHVibGljIHRleHRBbGlnbm1lbnRPcHRpb25zID0gdGV4dEFsaWdubWVudE9wdGlvbnM7XHJcbiAgcHVibGljIG91dGRhdGE7XHJcbiAgcHVibGljIHNvcnRpbmdfcHJvcHMgPSB7XHJcbiAgICBjb2xfaW5kZXg6IC0xLFxyXG4gICAgZGlyZWN0aW9uOiBcImRlc2NcIlxyXG4gIH07XHJcbiAgcHVibGljIGRhdGFSZWNlaXZlZDogYW55O1xyXG4gIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgcHVibGljIGVsZW06IGFueTtcclxuICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICBwdWJsaWMgJHNjZTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuIHx8IGRlZmF1bHRQYXR0ZXJuO1xyXG4gICAgdGhpcy4kc2NlID0gJHNjZTtcclxuICAgIHRoaXMudGVtcGxhdGVTcnYgPSAkaW5qZWN0b3IuZ2V0KFwidGVtcGxhdGVTcnZcIik7XHJcbiAgICB0aGlzLnRpbWVTcnYgPSAkaW5qZWN0b3IuZ2V0KFwidGltZVNydlwiKTtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtc25hcHNob3QtbG9hZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEgPyB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA6IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4O1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMubWFwKHBhdHRlcm4gPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxgLCAyKTtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiT3B0aW9uc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsIDMpO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGF0dGVybigpOiB2b2lkIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcclxuICAgICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlclxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2gobmV3UGF0dGVybik7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW1vdmVQYXR0ZXJuKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbW92ZVBhdHRlcm4oZGlyZWN0aW9uOiBzdHJpbmcsIGluZGV4OiBOdW1iZXIpIHtcclxuICAgIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KV07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSAtIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IE51bWJlcihpbmRleCkgLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IE51bWJlcihpbmRleCkgKyAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGNsb25lUGF0dGVybihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KV0pO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNvcGllZFBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgc29ydEJ5SGVhZGVyKGhlYWRlckluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuc29ydGluZ19wcm9wcy5jb2xfaW5kZXggPSBoZWFkZXJJbmRleDtcclxuICAgIHRoaXMuc29ydGluZ19wcm9wcy5kaXJlY3Rpb24gPSB0aGlzLnNvcnRpbmdfcHJvcHMuZGlyZWN0aW9uID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmICh0ZXh0LnNwbGl0KCcnKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIHRoaXMucGFuZWwgPSBjdHJsLnBhbmVsO1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5kYXRhUmVjZWl2ZWQpIHtcclxuICAgIGxldCBvdXRwdXRkYXRhOiBJQm9vbVNlcmllc1tdID0gdGhpcy5kYXRhUmVjZWl2ZWQubWFwKHNlcmllc0RhdGEgPT4ge1xyXG4gICAgICBsZXQgc2VyaWVzT3B0aW9ucyA9IHtcclxuICAgICAgICBkZWJ1Z19tb2RlOiB0aGlzLnBhbmVsLmRlYnVnX21vZGUsXHJcbiAgICAgICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciB8fCBcIl9cIlxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gbmV3IEJvb21TZXJpZXMoc2VyaWVzRGF0YSwgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgdGhpcy5wYW5lbC5wYXR0ZXJucywgc2VyaWVzT3B0aW9ucywgdGhpcy5wYW5lbC5zY29wZWRWYXJzLCB0aGlzLnRlbXBsYXRlU3J2LCB0aGlzLnRpbWVTcnYpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgYm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zOiBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zID0ge1xyXG4gICAgICBub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfYmc6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxyXG4gICAgICBub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dDogdGhpcy5wYW5lbC5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dCxcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX3RleHQ6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX3RleHQsXHJcbiAgICB9O1xyXG4gICAgbGV0IGJvb210YWJsZWRhdGE6IElCb29tVGFibGUgPSBzZXJpZXNUb1RhYmxlKG91dHB1dGRhdGEsIGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyk7XHJcbiAgICBsZXQgcmVuZGVyaW5nT3B0aW9uczogSUJvb21SZW5kZXJpbmdPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgY29uZmlnLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsXHJcbiAgICAgIGhpZGVfZmlyc3RfY29sdW1uOiB0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uLFxyXG4gICAgICBoaWRlX2hlYWRlcnM6IHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzLFxyXG4gICAgICB0ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbjogdGhpcy5wYW5lbC50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbixcclxuICAgICAgdGV4dF9hbGlnbm1lbnRfdmFsdWVzOiB0aGlzLnBhbmVsLnRleHRfYWxpZ25tZW50X3ZhbHVlc1xyXG4gICAgfTtcclxuICAgIGxldCBib29tX291dHB1dCA9IG5ldyBCb29tT3V0cHV0KHJlbmRlcmluZ09wdGlvbnMpO1xyXG4gICAgdGhpcy5vdXRkYXRhID0ge1xyXG4gICAgICBjb2xzX2ZvdW5kOiBib29tdGFibGVkYXRhLmNvbHNfZm91bmQubWFwKGNvbCA9PiB7IHJldHVybiB0aGlzLiRzY2UudHJ1c3RBc0h0bWwoY29sKTsgfSlcclxuICAgIH07XHJcbiAgICBsZXQgcmVuZGVyaW5nZGF0YTogSUJvb21IVE1MID0gYm9vbV9vdXRwdXQuZ2V0RGF0YUFzSFRNTChib29tdGFibGVkYXRhLCB0aGlzLnNvcnRpbmdfcHJvcHMpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKS5odG1sKGBgICsgcmVuZGVyaW5nZGF0YS5ib2R5KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJykuaHRtbCh0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBib29tX291dHB1dC5nZXREYXRhQXNEZWJ1Z0hUTUwob3V0cHV0ZGF0YSkgOiBgYCk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIpLnRvb2x0aXAoe1xyXG4gICAgICBib3VuZGFyeTogXCJzY3JvbGxQYXJlbnRcIlxyXG4gICAgfSk7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgbGV0IG9yaWdpbmFsSGVpZ2h0ID0gdGhpcy5jdHJsLmhlaWdodDtcclxuICAgIGlmIChpc05hTihvcmlnaW5hbEhlaWdodCkpIHtcclxuICAgICAgaWYgKHRoaXMuY3RybCAmJiB0aGlzLmN0cmwuZWxlbSAmJiB0aGlzLmN0cmwuZWxlbVswXSAmJiB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgICBvcmlnaW5hbEhlaWdodCA9IHRoaXMuY3RybC5lbGVtWzBdLmNsaWVudEhlaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBvcmlnaW5hbEhlaWdodCAtIDExMSA6IG9yaWdpbmFsSGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19