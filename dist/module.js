System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/boom/index", "./app/app", "./app/config"], function (exports_1, context_1) {
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
    var lodash_1, kbn_1, sdk_1, index_1, app_1, config_1, GrafanaBoomTableCtrl;
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
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.plugin_id + "/css/default.light.css",
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
                    _this.templateSrv = $injector.get('templateSrv');
                    _this.timeSrv = $injector.get('timeSrv');
                    _this.updatePrototypes();
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
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
                    this.addEditorTab('Patterns', "public/plugins/" + config_1.plugin_id + "/partials/editor.html", 2);
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = new index_1.BoomPattern({
                        row_col_wrapper: this.panel.row_col_wrapper,
                    });
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : this.panel.patterns.length - 1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex =
                        this.panel.activePatternIndex === -2 ? -2 : this.panel.patterns && this.panel.patterns.length > 0 ? this.panel.patterns.length - 1 : -1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[Number(index)];
                    if (direction === 'UP') {
                        this.panel.patterns[Number(index)] = this.panel.patterns[Number(index) - 1];
                        this.panel.patterns[Number(index) - 1] = tempElement;
                        this.panel.activePatternIndex = this.panel.activePatternIndex === -2 ? -2 : Number(index) - 1;
                    }
                    if (direction === 'DOWN') {
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
                        direction: 'desc',
                    };
                    this.panel.sorting_props.col_index = headerIndex;
                    this.panel.sorting_props.direction = this.panel.sorting_props.direction === 'asc' ? 'desc' : 'asc';
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.limitText = function (text, maxlength) {
                    if (text.split('').length > maxlength) {
                        text = text.substring(0, Number(maxlength) - 3) + '...';
                    }
                    return text;
                };
                GrafanaBoomTableCtrl.prototype.adjustScrollBar = function () {
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var originalHeight = this.ctrl.height;
                    if (isNaN(originalHeight)) {
                        if (this.ctrl && this.ctrl.elem && this.ctrl.elem[0] && this.ctrl.elem[0].clientHeight) {
                            originalHeight = this.ctrl.elem[0].clientHeight;
                        }
                    }
                    var maxheightofpanel = this.panel.debug_mode ? originalHeight - 111 : originalHeight - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + 'px' });
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                    this.panel = ctrl.panel;
                    this.panel.sorting_props = this.panel.sorting_props || {
                        col_index: -1,
                        direction: 'desc',
                    };
                };
                GrafanaBoomTableCtrl.templateUrl = 'partials/module.html';
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    var outputdata = this.dataReceived.map(function (seriesData) {
                        var seriesOptions = {
                            debug_mode: _this.panel.debug_mode,
                            row_col_wrapper: _this.panel.row_col_wrapper || '_',
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
                        first_column_link: this.panel.first_column_link || '#',
                        hide_first_column: this.panel.hide_first_column,
                        hide_headers: this.panel.hide_headers,
                        text_alignment_firstcolumn: this.panel.text_alignment_firstcolumn,
                        text_alignment_values: this.panel.text_alignment_values,
                    };
                    var boom_output = new index_1.BoomOutput(renderingOptions);
                    this.outdata = {
                        cols_found: boomtabledata.cols_found.map(function (col) {
                            return _this.$sce.trustAsHtml(col);
                        }),
                    };
                    var renderingdata = boom_output.getDataAsHTML(boomtabledata, this.panel.sorting_props);
                    this.elem.find('#boomtable_output_body').html("" + renderingdata.body);
                    this.elem.find('#boomtable_output_body_debug').html(this.panel.debug_mode ? boom_output.getDataAsDebugHTML(outputdata) : "");
                    this.elem.find("[data-toggle='tooltip']").tooltip({
                        boundary: 'scrollParent',
                    });
                    this.adjustScrollBar();
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFrQkEsbUJBQWEsQ0FBQztnQkFDWixJQUFJLEVBQUUsYUFBVyxrQkFBUywwQkFBdUI7Z0JBQ2pELEtBQUssRUFBRSxhQUFXLGtCQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBV2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBV3pCO29CQXJCTSxpQkFBVyxHQUFHLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkMsc0JBQWdCLEdBQUcsMkJBQWtCLENBQUM7b0JBQ3RDLDBCQUFvQixHQUFHLDZCQUFvQixDQUFDO29CQVNqRCxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLGVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksb0JBQWMsQ0FBQztvQkFDeEUsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDaEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN4QyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLEtBQUks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Q0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNoRCxRQUFRLEVBQUUsY0FBYztxQkFDekIsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDeEI7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IGtibiBmcm9tICdhcHAvY29yZS91dGlscy9rYm4nO1xyXG5pbXBvcnQgeyBsb2FkUGx1Z2luQ3NzLCBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSAnYXBwL3BsdWdpbnMvc2RrJztcclxuaW1wb3J0IHtcclxuICBJQm9vbVNlcmllcyxcclxuICBJQm9vbVJlbmRlcmluZ09wdGlvbnMsXHJcbiAgSUJvb21UYWJsZSxcclxuICBJQm9vbUhUTUwsXHJcbiAgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyxcclxuICBCb29tUGF0dGVybixcclxuICBCb29tU2VyaWVzLFxyXG4gIEJvb21PdXRwdXQsXHJcbn0gZnJvbSAnLi9hcHAvYm9vbS9pbmRleCc7XHJcbmltcG9ydCB7IGRlZmF1bHRQYXR0ZXJuLCBzZXJpZXNUb1RhYmxlIH0gZnJvbSAnLi9hcHAvYXBwJztcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCB2YWx1ZV9uYW1lX29wdGlvbnMsIHRleHRBbGlnbm1lbnRPcHRpb25zLCBjb25maWcgfSBmcm9tICcuL2FwcC9jb25maWcnO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2AsXHJcbn0pO1xyXG5cclxuY2xhc3MgR3JhZmFuYUJvb21UYWJsZUN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gJ3BhcnRpYWxzL21vZHVsZS5odG1sJztcclxuICBwdWJsaWMgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgdmFsdWVOYW1lT3B0aW9ucyA9IHZhbHVlX25hbWVfb3B0aW9ucztcclxuICBwdWJsaWMgdGV4dEFsaWdubWVudE9wdGlvbnMgPSB0ZXh0QWxpZ25tZW50T3B0aW9ucztcclxuICBwdWJsaWMgb3V0ZGF0YTtcclxuICBwdWJsaWMgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgcHVibGljIGN0cmw6IGFueTtcclxuICBwdWJsaWMgZWxlbTogYW55O1xyXG4gIHB1YmxpYyBhdHRyczogYW55O1xyXG4gIHB1YmxpYyAkc2NlOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IsICRzY2UpIHtcclxuICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwgY29uZmlnLnBhbmVsRGVmYXVsdHMpO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgZGVmYXVsdFBhdHRlcm47XHJcbiAgICB0aGlzLiRzY2UgPSAkc2NlO1xyXG4gICAgdGhpcy50ZW1wbGF0ZVNydiA9ICRpbmplY3Rvci5nZXQoJ3RlbXBsYXRlU3J2Jyk7XHJcbiAgICB0aGlzLnRpbWVTcnYgPSAkaW5qZWN0b3IuZ2V0KCd0aW1lU3J2Jyk7XHJcbiAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKCdkYXRhLXJlY2VpdmVkJywgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKCdkYXRhLXNuYXBzaG90LWxvYWQnLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oJ2luaXQtZWRpdC1tb2RlJywgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0xID8gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggOiB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleDtcclxuICB9XHJcbiAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCk6IHZvaWQge1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLm1hcChwYXR0ZXJuID0+IHtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHBhdHRlcm4sIEJvb21QYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICAgIHJldHVybiBwYXR0ZXJuO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkluaXRFZGl0TW9kZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKCdQYXR0ZXJucycsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvZWRpdG9yLmh0bWxgLCAyKTtcclxuICB9XHJcbiAgcHVibGljIGFkZFBhdHRlcm4oKTogdm9pZCB7XHJcbiAgICBsZXQgbmV3UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybih7XHJcbiAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsXHJcbiAgICB9KTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0yID8gLTIgOiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGF0dGVybihpbmRleDogTnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMiA/IC0yIDogdGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDAgPyB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBtb3ZlUGF0dGVybihkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcikge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdVUCcpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSAtIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMiA/IC0yIDogTnVtYmVyKGluZGV4KSAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnRE9XTicpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSA9IHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCkgKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMiA/IC0yIDogTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgY2xvbmVQYXR0ZXJuKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY29waWVkUGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBzb3J0QnlIZWFkZXIoaGVhZGVySW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzID0gdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzIHx8IHtcclxuICAgICAgY29sX2luZGV4OiAtMSxcclxuICAgICAgZGlyZWN0aW9uOiAnZGVzYycsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzLmNvbF9pbmRleCA9IGhlYWRlckluZGV4O1xyXG4gICAgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzLmRpcmVjdGlvbiA9IHRoaXMucGFuZWwuc29ydGluZ19wcm9wcy5kaXJlY3Rpb24gPT09ICdhc2MnID8gJ2Rlc2MnIDogJ2FzYyc7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbGltaXRUZXh0KHRleHQ6IHN0cmluZywgbWF4bGVuZ3RoOiBOdW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRleHQuc3BsaXQoJycpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgTnVtYmVyKG1heGxlbmd0aCkgLSAzKSArICcuLi4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGp1c3RTY3JvbGxCYXIoKTogdm9pZCB7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgbGV0IG9yaWdpbmFsSGVpZ2h0ID0gdGhpcy5jdHJsLmhlaWdodDtcclxuICAgIGlmIChpc05hTihvcmlnaW5hbEhlaWdodCkpIHtcclxuICAgICAgaWYgKHRoaXMuY3RybCAmJiB0aGlzLmN0cmwuZWxlbSAmJiB0aGlzLmN0cmwuZWxlbVswXSAmJiB0aGlzLmN0cmwuZWxlbVswXS5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgICBvcmlnaW5hbEhlaWdodCA9IHRoaXMuY3RybC5lbGVtWzBdLmNsaWVudEhlaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBvcmlnaW5hbEhlaWdodCAtIDExMSA6IG9yaWdpbmFsSGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyAncHgnIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICB0aGlzLnBhbmVsID0gY3RybC5wYW5lbDtcclxuICAgIHRoaXMucGFuZWwuc29ydGluZ19wcm9wcyA9IHRoaXMucGFuZWwuc29ydGluZ19wcm9wcyB8fCB7XHJcbiAgICAgIGNvbF9pbmRleDogLTEsXHJcbiAgICAgIGRpcmVjdGlvbjogJ2Rlc2MnLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICBsZXQgb3V0cHV0ZGF0YTogSUJvb21TZXJpZXNbXSA9IHRoaXMuZGF0YVJlY2VpdmVkLm1hcChzZXJpZXNEYXRhID0+IHtcclxuICAgICAgbGV0IHNlcmllc09wdGlvbnMgPSB7XHJcbiAgICAgICAgZGVidWdfbW9kZTogdGhpcy5wYW5lbC5kZWJ1Z19tb2RlLFxyXG4gICAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgfHwgJ18nLFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gbmV3IEJvb21TZXJpZXMoXHJcbiAgICAgICAgc2VyaWVzRGF0YSxcclxuICAgICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLFxyXG4gICAgICAgIHRoaXMucGFuZWwucGF0dGVybnMsXHJcbiAgICAgICAgc2VyaWVzT3B0aW9ucyxcclxuICAgICAgICB0aGlzLnBhbmVsLnNjb3BlZFZhcnMsXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVNydixcclxuICAgICAgICB0aGlzLnRpbWVTcnZcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9uczogSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnOiB0aGlzLnBhbmVsLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl9iZyxcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQ6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQsXHJcbiAgICAgIG5vbl9tYXRjaGluZ19jZWxsc190ZXh0OiB0aGlzLnBhbmVsLm5vbl9tYXRjaGluZ19jZWxsc190ZXh0LFxyXG4gICAgfTtcclxuICAgIGxldCBib29tdGFibGVkYXRhOiBJQm9vbVRhYmxlID0gc2VyaWVzVG9UYWJsZShvdXRwdXRkYXRhLCBib29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMpO1xyXG4gICAgbGV0IHJlbmRlcmluZ09wdGlvbnM6IElCb29tUmVuZGVyaW5nT3B0aW9ucyA9IHtcclxuICAgICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLFxyXG4gICAgICBmaXJzdF9jb2x1bW5fbGluazogdGhpcy5wYW5lbC5maXJzdF9jb2x1bW5fbGluayB8fCAnIycsXHJcbiAgICAgIGhpZGVfZmlyc3RfY29sdW1uOiB0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uLFxyXG4gICAgICBoaWRlX2hlYWRlcnM6IHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzLFxyXG4gICAgICB0ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbjogdGhpcy5wYW5lbC50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbixcclxuICAgICAgdGV4dF9hbGlnbm1lbnRfdmFsdWVzOiB0aGlzLnBhbmVsLnRleHRfYWxpZ25tZW50X3ZhbHVlcyxcclxuICAgIH07XHJcbiAgICBsZXQgYm9vbV9vdXRwdXQgPSBuZXcgQm9vbU91dHB1dChyZW5kZXJpbmdPcHRpb25zKTtcclxuICAgIHRoaXMub3V0ZGF0YSA9IHtcclxuICAgICAgY29sc19mb3VuZDogYm9vbXRhYmxlZGF0YS5jb2xzX2ZvdW5kLm1hcChjb2wgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRzY2UudHJ1c3RBc0h0bWwoY29sKTtcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG4gICAgbGV0IHJlbmRlcmluZ2RhdGE6IElCb29tSFRNTCA9IGJvb21fb3V0cHV0LmdldERhdGFBc0hUTUwoYm9vbXRhYmxlZGF0YSwgdGhpcy5wYW5lbC5zb3J0aW5nX3Byb3BzKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5JykuaHRtbChgYCArIHJlbmRlcmluZ2RhdGEuYm9keSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZycpLmh0bWwodGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gYm9vbV9vdXRwdXQuZ2V0RGF0YUFzRGVidWdIVE1MKG91dHB1dGRhdGEpIDogYGApO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCJbZGF0YS10b2dnbGU9J3Rvb2x0aXAnXVwiKS50b29sdGlwKHtcclxuICAgICAgYm91bmRhcnk6ICdzY3JvbGxQYXJlbnQnLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkanVzdFNjcm9sbEJhcigpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybCB9O1xyXG4iXX0=