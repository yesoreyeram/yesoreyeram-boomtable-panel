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
                function GrafanaBoomTableCtrl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
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
                        return new index_1.BoomSeries(seriesData, _this.panel.defaultPattern, _this.panel.patterns, seriesOptions);
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
                        text_alignment_header: this.panel.text_alignment_header,
                        text_alignment_values: this.panel.text_alignment_values
                    };
                    var boom_output = new index_1.BoomOutput(renderingOptions);
                    var renderingdata = boom_output.getDataAsHTML(boomtabledata);
                    this.elem.find("#boomtable_output_body_headers").html("<br/>" + renderingdata.headers);
                    this.elem.find('#boomtable_output_body').html("" + renderingdata.body);
                    this.elem.find('#boomtable_output_body_debug').html(this.panel.debug_mode ? boom_output.getDataAsDebugHTML(outputdata) : "");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFRakQsOEJBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQVF6QjtvQkFmTSxpQkFBVyxHQUFHLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkMsc0JBQWdCLEdBQUcsMkJBQWtCLENBQUM7b0JBTzNDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxvQkFBYyxDQUFDO29CQUN4RSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLEtBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDOztnQkFDcEksQ0FBQztnQkFDTywrQ0FBZ0IsR0FBeEI7b0JBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO3dCQUM3QixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN0RCxPQUFPLE9BQU8sQ0FBQztvQkFDakIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDTSw2Q0FBYyxHQUFyQixVQUFzQixJQUFTO29CQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDekIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNNLDZDQUFjLEdBQXJCO29CQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLG9CQUFrQixrQkFBUyw0QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsb0JBQWtCLGtCQUFTLDJCQUF3QixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixDQUFDO2dCQUNNLHlDQUFVLEdBQWpCO29CQUNFLElBQUksVUFBVSxHQUFHLElBQUksbUJBQVcsQ0FBQzt3QkFDL0IsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZTtxQkFDNUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ00sNENBQWEsR0FBcEIsVUFBcUIsS0FBYTtvQkFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ00sMENBQVcsR0FBbEIsVUFBbUIsU0FBaUIsRUFBRSxLQUFhO29CQUNqRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO3dCQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzVFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7d0JBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDbkQ7b0JBQ0QsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO3dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzVFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7d0JBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDbkQ7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNNLDJDQUFZLEdBQW5CLFVBQW9CLEtBQWE7b0JBQy9CLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLG1CQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNNLHdDQUFTLEdBQWhCLFVBQWlCLElBQVksRUFBRSxTQUFpQjtvQkFDOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7d0JBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUN6RDtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNNLG1DQUFJLEdBQVgsVUFBWSxLQUFVLEVBQUUsSUFBUyxFQUFFLEtBQVUsRUFBRSxJQUFTO29CQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztnQkE1RWEsZ0NBQVcsR0FBRyxzQkFBc0IsQ0FBQztnQkE2RXJELDJCQUFDO2FBQUEsQUE5RUQsQ0FBbUMsc0JBQWdCOztZQWdGbkQsb0JBQW9CLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztnQkFBQSxpQkFtQ3ZDO2dCQWxDQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLElBQUksVUFBVSxHQUFrQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFVBQVU7d0JBQzlELElBQUksYUFBYSxHQUFHOzRCQUNsQixVQUFVLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFVOzRCQUNqQyxlQUFlLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksR0FBRzt5QkFDbkQsQ0FBQzt3QkFDRixPQUFPLElBQUksa0JBQVUsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQ25HLENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksOEJBQThCLEdBQW9DO3dCQUNwRSwyQkFBMkIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLDJCQUEyQjt3QkFDbkUsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyw2QkFBNkI7d0JBQ3ZFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCO3FCQUM1RCxDQUFDO29CQUNGLElBQUksYUFBYSxHQUFlLG1CQUFhLENBQUMsVUFBVSxFQUFDLDhCQUE4QixDQUFDLENBQUM7b0JBQ3pGLElBQUksZ0JBQWdCLEdBQTBCO3dCQUM1QyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixJQUFJLGVBQU0sQ0FBQyxzQkFBc0I7d0JBQzFGLGlCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO3dCQUMvQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO3dCQUNyQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQjt3QkFDakUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUI7d0JBQ3ZELHFCQUFxQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCO3FCQUN4RCxDQUFDO29CQUNGLElBQUksV0FBVyxHQUFHLElBQUksa0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLGFBQWEsR0FBZSxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2RixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ2hELFFBQVEsRUFBRSxjQUFjO3FCQUN6QixDQUFDLENBQUM7b0JBQ0gsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDckQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQzlGLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDekQ7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gJ2FwcC9jb3JlL3V0aWxzL2tibic7XHJcbmltcG9ydCB7IGxvYWRQbHVnaW5Dc3MsIE1ldHJpY3NQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCB7IElCb29tU2VyaWVzLCBJQm9vbVJlbmRlcmluZ09wdGlvbnMsIElCb29tVGFibGUsIElCb29tSFRNTCwgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2FwcC9ib29tL2luZGV4XCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBCb29tU2VyaWVzLCBCb29tT3V0cHV0IH0gZnJvbSBcIi4vYXBwL2Jvb20vaW5kZXhcIjtcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCB2YWx1ZV9uYW1lX29wdGlvbnMsIGNvbmZpZyB9IGZyb20gXCIuL2FwcC9jb25maWdcIjtcclxuaW1wb3J0IHsgZGVmYXVsdFBhdHRlcm4sIHNlcmllc1RvVGFibGUgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcclxuICBwdWJsaWMgdW5pdEZvcm1hdHMgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgdmFsdWVOYW1lT3B0aW9ucyA9IHZhbHVlX25hbWVfb3B0aW9ucztcclxuICBwdWJsaWMgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgcHVibGljIGN0cmw6IGFueTtcclxuICBwdWJsaWMgZWxlbTogYW55O1xyXG4gIHB1YmxpYyBhdHRyczogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuIHx8IGRlZmF1bHRQYXR0ZXJuO1xyXG4gICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtcmVjZWl2ZWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1zbmFwc2hvdC1sb2FkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMSA/IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIDogdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXg7XHJcbiAgfVxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpOiB2b2lkIHtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLCBCb29tUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5tYXAocGF0dGVybiA9PiB7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihwYXR0ZXJuLCBCb29tUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgICByZXR1cm4gcGF0dGVybjtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLmRhdGFSZWNlaXZlZCA9IGRhdGE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgb25Jbml0RWRpdE1vZGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIlBhdHRlcm5zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMuaHRtbGAsIDIpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJPcHRpb25zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCwgMyk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQYXR0ZXJuKCk6IHZvaWQge1xyXG4gICAgbGV0IG5ld1BhdHRlcm4gPSBuZXcgQm9vbVBhdHRlcm4oe1xyXG4gICAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyXHJcbiAgICB9KTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBhdHRlcm4oaW5kZXg6IE51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBtb3ZlUGF0dGVybihkaXJlY3Rpb246IHN0cmluZywgaW5kZXg6IE51bWJlcikge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpIC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gTnVtYmVyKGluZGV4KSAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW051bWJlcihpbmRleCldID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbTnVtYmVyKGluZGV4KSArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gTnVtYmVyKGluZGV4KSArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgY2xvbmVQYXR0ZXJuKGluZGV4OiBOdW1iZXIpOiB2b2lkIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tOdW1iZXIoaW5kZXgpXSk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY29waWVkUGF0dGVybiwgQm9vbVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW1pdFRleHQodGV4dDogc3RyaW5nLCBtYXhsZW5ndGg6IE51bWJlcik6IHN0cmluZyB7XHJcbiAgICBpZiAodGV4dC5zcGxpdCgnJykubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBOdW1iZXIobWF4bGVuZ3RoKSAtIDMpICsgXCIuLi5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBwdWJsaWMgbGluayhzY29wZTogYW55LCBlbGVtOiBhbnksIGF0dHJzOiBhbnksIGN0cmw6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgfVxyXG59XHJcblxyXG5HcmFmYW5hQm9vbVRhYmxlQ3RybC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmICh0aGlzLmRhdGFSZWNlaXZlZCkge1xyXG4gICAgbGV0IG91dHB1dGRhdGE6IElCb29tU2VyaWVzW10gPSB0aGlzLmRhdGFSZWNlaXZlZC5tYXAoc2VyaWVzRGF0YSA9PiB7XHJcbiAgICAgIGxldCBzZXJpZXNPcHRpb25zID0ge1xyXG4gICAgICAgIGRlYnVnX21vZGU6IHRoaXMucGFuZWwuZGVidWdfbW9kZSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyIHx8IFwiX1wiXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBuZXcgQm9vbVNlcmllcyhzZXJpZXNEYXRhLCB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLCB0aGlzLnBhbmVsLnBhdHRlcm5zLCBzZXJpZXNPcHRpb25zKTtcclxuICAgIH0pO1xyXG4gICAgbGV0IGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9uczogSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnOiB0aGlzLnBhbmVsLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl9iZyxcclxuICAgICAgbm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQ6IHRoaXMucGFuZWwubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQsXHJcbiAgICAgIG5vbl9tYXRjaGluZ19jZWxsc190ZXh0OiB0aGlzLnBhbmVsLm5vbl9tYXRjaGluZ19jZWxsc190ZXh0LFxyXG4gICAgfTtcclxuICAgIGxldCBib29tdGFibGVkYXRhOiBJQm9vbVRhYmxlID0gc2VyaWVzVG9UYWJsZShvdXRwdXRkYXRhLGJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyk7XHJcbiAgICBsZXQgcmVuZGVyaW5nT3B0aW9uczogSUJvb21SZW5kZXJpbmdPcHRpb25zID0ge1xyXG4gICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgY29uZmlnLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsXHJcbiAgICAgIGhpZGVfZmlyc3RfY29sdW1uOiB0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uLFxyXG4gICAgICBoaWRlX2hlYWRlcnM6IHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzLFxyXG4gICAgICB0ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbjogdGhpcy5wYW5lbC50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbixcclxuICAgICAgdGV4dF9hbGlnbm1lbnRfaGVhZGVyOiB0aGlzLnBhbmVsLnRleHRfYWxpZ25tZW50X2hlYWRlcixcclxuICAgICAgdGV4dF9hbGlnbm1lbnRfdmFsdWVzOiB0aGlzLnBhbmVsLnRleHRfYWxpZ25tZW50X3ZhbHVlc1xyXG4gICAgfTtcclxuICAgIGxldCBib29tX291dHB1dCA9IG5ldyBCb29tT3V0cHV0KHJlbmRlcmluZ09wdGlvbnMpO1xyXG4gICAgbGV0IHJlbmRlcmluZ2RhdGE6IElCb29tSFRNTCAgPSBib29tX291dHB1dC5nZXREYXRhQXNIVE1MKGJvb210YWJsZWRhdGEpO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNcIikuaHRtbChgPGJyLz5gICsgcmVuZGVyaW5nZGF0YS5oZWFkZXJzKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5JykuaHRtbChgYCArIHJlbmRlcmluZ2RhdGEuYm9keSk7XHJcbiAgICB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZycpLmh0bWwodGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gYm9vbV9vdXRwdXQuZ2V0RGF0YUFzRGVidWdIVE1MKG91dHB1dGRhdGEpIDogYGApO1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCJbZGF0YS10b2dnbGU9J3Rvb2x0aXAnXVwiKS50b29sdGlwKHtcclxuICAgICAgYm91bmRhcnk6IFwic2Nyb2xsUGFyZW50XCJcclxuICAgIH0pO1xyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoJy50YWJsZS1wYW5lbC1zY3JvbGwnKTtcclxuICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gdGhpcy5jdHJsLmhlaWdodCAtIDExMSA6IHRoaXMuY3RybC5oZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=