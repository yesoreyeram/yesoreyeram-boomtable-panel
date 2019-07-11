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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFlakQsOEJBQVksTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJO29CQUFuQyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FXekI7b0JBekJNLGlCQUFXLEdBQUcsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNuQyxzQkFBZ0IsR0FBRywyQkFBa0IsQ0FBQztvQkFDdEMsMEJBQW9CLEdBQUcsNkJBQW9CLENBQUM7b0JBRTVDLG1CQUFhLEdBQUc7d0JBQ3JCLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQ2IsU0FBUyxFQUFFLE1BQU07cUJBQ2xCLENBQUM7b0JBUUEsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxlQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLG9CQUFjLENBQUM7b0JBQ3hFLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2hELEtBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDeEMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxD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QUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ2hELFFBQVEsRUFBRSxjQUFjO3FCQUN6QixDQUFDLENBQUM7b0JBQ0gsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDckQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3RDLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO3dCQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFOzRCQUN0RixjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO3lCQUNqRDtxQkFDRjtvQkFDRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO29CQUMxRixRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGtibiBmcm9tICdhcHAvY29yZS91dGlscy9rYm4nO1xyXG5pbXBvcnQgeyBsb2FkUGx1Z2luQ3NzLCBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQgeyBJQm9vbVNlcmllcywgSUJvb21SZW5kZXJpbmdPcHRpb25zLCBJQm9vbVRhYmxlLCBJQm9vbUhUTUwsIElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi9hcHAvYm9vbS9pbmRleFwiO1xyXG5pbXBvcnQgeyBCb29tUGF0dGVybiwgQm9vbVNlcmllcywgQm9vbU91dHB1dCB9IGZyb20gXCIuL2FwcC9ib29tL2luZGV4XCI7XHJcbmltcG9ydCB7IHBsdWdpbl9pZCwgdmFsdWVfbmFtZV9vcHRpb25zLCB0ZXh0QWxpZ25tZW50T3B0aW9ucywgY29uZmlnIH0gZnJvbSBcIi4vYXBwL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBkZWZhdWx0UGF0dGVybiwgc2VyaWVzVG9UYWJsZSB9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuXHJcbmxvYWRQbHVnaW5Dc3Moe1xyXG4gIGRhcms6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5kYXJrLmNzc2AsXHJcbiAgbGlnaHQ6IGBwbHVnaW5zLyR7cGx1Z2luX2lkfS9jc3MvZGVmYXVsdC5saWdodC5jc3NgXHJcbn0pO1xyXG5cclxuY2xhc3MgR3JhZmFuYUJvb21UYWJsZUN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHB1YmxpYyB2YWx1ZU5hbWVPcHRpb25zID0gdmFsdWVfbmFtZV9vcHRpb25zO1xyXG4gIHB1YmxpYyB0ZXh0QWxpZ25tZW50T3B0aW9ucyA9IHRleHRBbGlnbm1lbnRPcHRpb25zO1xyXG4gIHB1YmxpYyBvdXRkYXRhO1xyXG4gIHB1YmxpYyBzb3J0aW5nX3Byb3BzID0ge1xyXG4gICAgY29sX2luZGV4OiAtMSxcclxuICAgIGRpcmVjdGlvbjogXCJkZXNjXCJcclxuICB9O1xyXG4gIHB1YmxpYyBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgcHVibGljICRzY2U6IGFueTtcclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3RvciwgJHNjZSkge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCBjb25maWcucGFuZWxEZWZhdWx0cyk7XHJcbiAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybjtcclxuICAgIHRoaXMuJHNjZSA9ICRzY2U7XHJcbiAgICB0aGlzLnRlbXBsYXRlU3J2ID0gJGluamVjdG9yLmdldChcInRlbXBsYXRlU3J2XCIpO1xyXG4gICAgdGhpcy50aW1lU3J2ID0gJGluamVjdG9yLmdldChcInRpbWVTcnZcIik7XHJcbiAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXNuYXBzaG90LWxvYWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0xID8gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggOiB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleDtcclxuICB9XHJcbiAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLm1hcChwYXR0ZXJuID0+IHtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICAgIHJldHVybiBwYXR0ZXJuO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiUGF0dGVybnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9lZGl0b3IuaHRtbGAsIDIpO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGF0dGVybigpOiB2b2lkIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcclxuICAgICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlclxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2gobmV3UGF0dGVybik7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMiA/IC0yIDogKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGF0dGVybihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMiA/IC0yIDogKCh0aGlzLnBhbmVsLnBhdHRlcm5zICYmIHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoID4gMCkgPyAodGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxKSA6IC0xKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBtb3ZlUGF0dGVybihkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcikge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiBOdW1iZXIoaW5kZXgpIC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KV0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgKyAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTIgPyAtMiA6IE51bWJlcihpbmRleCkgKyAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGNsb25lUGF0dGVybihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KV0pO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNvcGllZFBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgc29ydEJ5SGVhZGVyKGhlYWRlckluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuc29ydGluZ19wcm9wcy5jb2xfaW5kZXggPSBoZWFkZXJJbmRleDtcclxuICAgIHRoaXMuc29ydGluZ19wcm9wcy5kaXJlY3Rpb24gPSB0aGlzLnNvcnRpbmdfcHJvcHMuZGlyZWN0aW9uID09PSBcImFzY1wiID8gXCJkZXNjXCIgOiBcImFzY1wiO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIGxpbWl0VGV4dCh0ZXh0OiBzdHJpbmcsIG1heGxlbmd0aDogTnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmICh0ZXh0LnNwbGl0KCcnKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIE51bWJlcihtYXhsZW5ndGgpIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSwgY3RybDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIHRoaXMucGFuZWwgPSBjdHJsLnBhbmVsO1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5kYXRhUmVjZWl2ZWQpIHtcclxuICAgIGxldCBvdXRwdXRkYXRhOiBJQm9vbVNlcmllc1tdID0gdGhpcy5kYXRhUmVjZWl2ZWQubWFwKHNlcmllc0RhdGEgPT4ge1xyXG4gICAgICBsZXQgc2VyaWVzT3B0aW9ucyA9IHtcclxuICAgICAgICBkZWJ1Z19tb2RlOiB0aGlzLnBhbmVsLmRlYnVnX21vZGUsXHJcbiAgICAgICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciB8fCBcIl9cIlxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gbmV3IEJvb21TZXJpZXMoc2VyaWVzRGF0YSwgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiwgdGhpcy5wYW5lbC5wYXR0ZXJucywgc2VyaWVzT3B0aW9ucywgdGhpcy5wYW5lbC5zY29wZWRWYXJzLCB0aGlzLnRlbXBsYXRlU3J2LCB0aGlzLnRpbWVTcnYpO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgYm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zOiBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zID0ge1xyXG4gICAgICBub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfYmc6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxyXG4gICAgICBub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dDogdGhpcy5wYW5lbC5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dCxcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX3RleHQ6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX3RleHQsXHJcbiAgICB9O1xyXG4gICAgbGV0IGJvb210YWJsZWRhdGE6IElCb29tVGFibGUgPSBzZXJpZXNUb1RhYmxlKG91dHB1dGRhdGEsIGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyk7XHJcbiAgICBsZXQgcmVuZGVyaW5nT3B0aW9uczogSUJvb21SZW5kZXJpbmdPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgY29uZmlnLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsXHJcbiAgICAgIGhpZGVfZmlyc3RfY29sdW1uOiB0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uLFxyXG4gICAgICBoaWRlX2hlYWRlcnM6IHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzLFxyXG4gICAgICB0ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbjogdGhpcy5wYW5lbC50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbixcclxuICAgICAgdGV4dF9hbGlnbm1lbnRfdmFsdWVzOiB0aGlzLnBhbmVsLnRleHRfYWxpZ25tZW50X3ZhbHVlc1xyXG4gICAgfTtcclxuICAgIGxldCBib29tX291dHB1dCA9IG5ldyBCb29tT3V0cHV0KHJlbmRlcmluZ09wdGlvbnMpO1xyXG4gICAgdGhpcy5vdXRkYXRhID0ge1xyXG4gICAgICBjb2xzX2ZvdW5kOiBib29tdGFibGVkYXRhLmNvbHNfZm91bmQubWFwKGNvbCA9PiB7IHJldHVybiB0aGlzLiRzY2UudHJ1c3RBc0h0bWwoY29sKTsgfSlcclxuICAgIH07XHJcbiAgICBsZXQgcmVuZGVyaW5nZGF0YTogSUJvb21IVE1MID0gYm9vbV9vdXRwdXQuZ2V0RGF0YUFzSFRNTChib29tdGFibGVkYXRhLCB0aGlzLnNvcnRpbmdfcHJvcHMpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKS5odG1sKGBgICsgcmVuZGVyaW5nZGF0YS5ib2R5KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJykuaHRtbCh0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBib29tX291dHB1dC5nZXREYXRhQXNEZWJ1Z0hUTUwob3V0cHV0ZGF0YSkgOiBgYCk7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIpLnRvb2x0aXAoe1xyXG4gICAgICBib3VuZGFyeTogXCJzY3JvbGxQYXJlbnRcIlxyXG4gICAgfSk7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgbGV0IG9yaWdpbmFsSGVpZ2h0ID0gdGhpcy5jdHJsLmhlaWdodDtcclxuICAgIGlmIChpc05hTihvcmlnaW5hbEhlaWdodCkpIHtcclxuICAgICAgaWYgKHRoaXMuY3RybCAmJiB0aGlzLmN0cmwuZWxlbSAmJiB0aGlzLmN0cmwuZWxlbVswXSAmJiB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgICBvcmlnaW5hbEhlaWdodCA9IHRoaXMuY3RybC5lbGVtWzBdLmNsaWVudEhlaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBvcmlnaW5hbEhlaWdodCAtIDExMSA6IG9yaWdpbmFsSGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19