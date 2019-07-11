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
                    this.addEditorTab("Patterns", "public/plugins/" + config_1.plugin_id + "/partials/editor.html", 2);
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = new index_1.BoomPattern({
                        row_col_wrapper: this.panel.row_col_wrapper
                    });
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : (this.panel.patterns.length - 1);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : ((this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[Number(index)];
                    if (direction === "UP") {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) - 1];
                        this.panel.patterns[Number(index) - 1] = tempElement;
                        this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : Number(index) - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) + 1];
                        this.panel.patterns[Number(index) + 1] = tempElement;
                        this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : Number(index) + 1;
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
                    this.panel.sorting_props = this.panel.sorting_props || {
                        col_index: -1,
                        direction: "desc"
                    };
                    this.panel.sorting_props.col_index = headerIndex;
                    this.panel.sorting_props.direction = this.panel.sorting_props.direction === "asc" ? "desc" : "asc";
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
                    this.panel.sorting_props = this.panel.sorting_props || {
                        col_index: -1,
                        direction: "desc"
                    };
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
                    var renderingdata = boom_output.getDataAsHTML(boomtabledata, this.panel.sorting_props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFXakQsOEJBQVksTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJO29CQUFuQyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FXekI7b0JBckJNLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxzQkFBZ0IsR0FBRywyQkFBa0IsQ0FBQztvQkFDdEMsMEJBQW9CLEdBQUcsNkJBQW9CLENBQUM7b0JBU2pELGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxvQkFBYyxDQUFDO29CQUN4RSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNoRCxLQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxD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Q0FBQyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7b0JBQzFGLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDekQ7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gJ2FwcC9jb3JlL3V0aWxzL2tibic7XHJcbmltcG9ydCB7IGxvYWRQbHVnaW5Dc3MsIE1ldHJpY3NQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCB7IElCb29tU2VyaWVzLCBJQm9vbVJlbmRlcmluZ09wdGlvbnMsIElCb29tVGFibGUsIElCb29tSFRNTCwgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2FwcC9ib29tL2luZGV4XCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBCb29tU2VyaWVzLCBCb29tT3V0cHV0IH0gZnJvbSBcIi4vYXBwL2Jvb20vaW5kZXhcIjtcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCB2YWx1ZV9uYW1lX29wdGlvbnMsIHRleHRBbGlnbm1lbnRPcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRQYXR0ZXJuLCBzZXJpZXNUb1RhYmxlIH0gZnJvbSBcIi4vYXBwL2FwcFwiO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxufSk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgcHVibGljIHVuaXRGb3JtYXRzID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgcHVibGljIHZhbHVlTmFtZU9wdGlvbnMgPSB2YWx1ZV9uYW1lX29wdGlvbnM7XHJcbiAgcHVibGljIHRleHRBbGlnbm1lbnRPcHRpb25zID0gdGV4dEFsaWdubWVudE9wdGlvbnM7XHJcbiAgcHVibGljIG91dGRhdGE7XHJcbiAgcHVibGljIGRhdGFSZWNlaXZlZDogYW55O1xyXG4gIHB1YmxpYyBjdHJsOiBhbnk7XHJcbiAgcHVibGljIGVsZW06IGFueTtcclxuICBwdWJsaWMgYXR0cnM6IGFueTtcclxuICBwdWJsaWMgJHNjZTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuIHx8IGRlZmF1bHRQYXR0ZXJuO1xyXG4gICAgdGhpcy4kc2NlID0gJHNjZTtcclxuICAgIHRoaXMudGVtcGxhdGVTcnYgPSAkaW5qZWN0b3IuZ2V0KFwidGVtcGxhdGVTcnZcIik7XHJcbiAgICB0aGlzLnRpbWVTcnYgPSAkaW5qZWN0b3IuZ2V0KFwidGltZVNydlwiKTtcclxuICAgIHRoaXMudXBkYXRlUHJvdG90eXBlcygpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtc25hcHNob3QtbG9hZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEgPyB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA6IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4O1xyXG4gIH1cclxuICBwcml2YXRlIHVwZGF0ZVByb3RvdHlwZXMoKTogdm9pZCB7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMubWFwKHBhdHRlcm4gPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG9uSW5pdEVkaXRNb2RlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL2VkaXRvci5odG1sYCwgMik7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQYXR0ZXJuKCk6IHZvaWQge1xyXG4gICAgbGV0IG5ld1BhdHRlcm4gPSBuZXcgQm9vbVBhdHRlcm4oe1xyXG4gICAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyXHJcbiAgICB9KTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiAodGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW1vdmVQYXR0ZXJuKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiAoKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTEpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG1vdmVQYXR0ZXJuKGRpcmVjdGlvbjogc3RyaW5nLCBpbmRleDogTnVtYmVyKSB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgLSAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpIC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTIgPyAtMiA6IE51bWJlcihpbmRleCkgLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMiA/IC0yIDogTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgY2xvbmVQYXR0ZXJuKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY29waWVkUGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzb3J0QnlIZWFkZXIoaGVhZGVySW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzID0gdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzIHx8IHtcclxuICAgICAgY29sX2luZGV4OiAtMSxcclxuICAgICAgZGlyZWN0aW9uOiBcImRlc2NcIlxyXG4gICAgfTtcclxuICAgIHRoaXMucGFuZWwuc29ydGluZ19wcm9wcy5jb2xfaW5kZXggPSBoZWFkZXJJbmRleDtcclxuICAgIHRoaXMucGFuZWwuc29ydGluZ19wcm9wcy5kaXJlY3Rpb24gPSB0aGlzLnBhbmVsLnNvcnRpbmdfcHJvcHMuZGlyZWN0aW9uID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmICh0ZXh0LnNwbGl0KCcnKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIHRoaXMucGFuZWwgPSBjdHJsLnBhbmVsO1xyXG4gICAgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzID0gdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzIHx8IHtcclxuICAgICAgY29sX2luZGV4OiAtMSxcclxuICAgICAgZGlyZWN0aW9uOiBcImRlc2NcIlxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICBsZXQgb3V0cHV0ZGF0YTogSUJvb21TZXJpZXNbXSA9IHRoaXMuZGF0YVJlY2VpdmVkLm1hcChzZXJpZXNEYXRhID0+IHtcclxuICAgICAgbGV0IHNlcmllc09wdGlvbnMgPSB7XHJcbiAgICAgICAgZGVidWdfbW9kZTogdGhpcy5wYW5lbC5kZWJ1Z19tb2RlLFxyXG4gICAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgfHwgXCJfXCJcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG5ldyBCb29tU2VyaWVzKHNlcmllc0RhdGEsIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4sIHRoaXMucGFuZWwucGF0dGVybnMsIHNlcmllc09wdGlvbnMsIHRoaXMucGFuZWwuc2NvcGVkVmFycywgdGhpcy50ZW1wbGF0ZVNydiwgdGhpcy50aW1lU3J2KTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9uczogSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnOiB0aGlzLnBhbmVsLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl9iZyxcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQ6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQsXHJcbiAgICAgIG5vbl9tYXRjaGluZ19jZWxsc190ZXh0OiB0aGlzLnBhbmVsLm5vbl9tYXRjaGluZ19jZWxsc190ZXh0LFxyXG4gICAgfTtcclxuICAgIGxldCBib29tdGFibGVkYXRhOiBJQm9vbVRhYmxlID0gc2VyaWVzVG9UYWJsZShvdXRwdXRkYXRhLCBib29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMpO1xyXG4gICAgbGV0IHJlbmRlcmluZ09wdGlvbnM6IElCb29tUmVuZGVyaW5nT3B0aW9ucyA9IHtcclxuICAgICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLFxyXG4gICAgICBoaWRlX2ZpcnN0X2NvbHVtbjogdGhpcy5wYW5lbC5oaWRlX2ZpcnN0X2NvbHVtbixcclxuICAgICAgaGlkZV9oZWFkZXJzOiB0aGlzLnBhbmVsLmhpZGVfaGVhZGVycyxcclxuICAgICAgdGV4dF9hbGlnbm1lbnRfZmlyc3Rjb2x1bW46IHRoaXMucGFuZWwudGV4dF9hbGlnbm1lbnRfZmlyc3Rjb2x1bW4sXHJcbiAgICAgIHRleHRfYWxpZ25tZW50X3ZhbHVlczogdGhpcy5wYW5lbC50ZXh0X2FsaWdubWVudF92YWx1ZXNcclxuICAgIH07XHJcbiAgICBsZXQgYm9vbV9vdXRwdXQgPSBuZXcgQm9vbU91dHB1dChyZW5kZXJpbmdPcHRpb25zKTtcclxuICAgIHRoaXMub3V0ZGF0YSA9IHtcclxuICAgICAgY29sc19mb3VuZDogYm9vbXRhYmxlZGF0YS5jb2xzX2ZvdW5kLm1hcChjb2wgPT4geyByZXR1cm4gdGhpcy4kc2NlLnRydXN0QXNIdG1sKGNvbCk7IH0pXHJcbiAgICB9O1xyXG4gICAgbGV0IHJlbmRlcmluZ2RhdGE6IElCb29tSFRNTCA9IGJvb21fb3V0cHV0LmdldERhdGFBc0hUTUwoYm9vbXRhYmxlZGF0YSwgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5JykuaHRtbChgYCArIHJlbmRlcmluZ2RhdGEuYm9keSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZycpLmh0bWwodGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gYm9vbV9vdXRwdXQuZ2V0RGF0YUFzRGVidWdIVE1MKG91dHB1dGRhdGEpIDogYGApO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCJbZGF0YS10b2dnbGU9J3Rvb2x0aXAnXVwiKS50b29sdGlwKHtcclxuICAgICAgYm91bmRhcnk6IFwic2Nyb2xsUGFyZW50XCJcclxuICAgIH0pO1xyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoJy50YWJsZS1wYW5lbC1zY3JvbGwnKTtcclxuICAgIGxldCBvcmlnaW5hbEhlaWdodCA9IHRoaXMuY3RybC5oZWlnaHQ7XHJcbiAgICBpZiAoaXNOYU4ob3JpZ2luYWxIZWlnaHQpKSB7XHJcbiAgICAgIGlmICh0aGlzLmN0cmwgJiYgdGhpcy5jdHJsLmVsZW0gJiYgdGhpcy5jdHJsLmVsZW1bMF0gJiYgdGhpcy5jdHJsLmVsZW1bMF0uY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQgPSB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gb3JpZ2luYWxIZWlnaHQgLSAxMTEgOiBvcmlnaW5hbEhlaWdodCAtIDMxO1xyXG4gICAgcm9vdEVsZW0uY3NzKHsgJ21heC1oZWlnaHQnOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgR3JhZmFuYUJvb21UYWJsZUN0cmwgYXMgUGFuZWxDdHJsXHJcbn07XHJcbiJdfQ==