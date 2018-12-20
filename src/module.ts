///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from 'app/core/utils/kbn';
import { loadPluginCss, MetricsPanelCtrl } from "app/plugins/sdk";
import * as utils from "./app/utils";
import { defaultPattern, seriesToTable, getRenderingData } from "./app/app";
import { plugin_id, value_name_options, config } from "./app/config";
import { BoomPattern, BoomSeries } from "./app/Boom";

loadPluginCss({
  dark: `plugins/${plugin_id}/css/default.dark.css`,
  light: `plugins/${plugin_id}/css/default.light.css`
});

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  public static templateUrl = "partials/module.html";
  public limitText = utils.limitText;
  public unitFormats = kbn.getUnitFormats();
  public valueNameOptions = value_name_options;
  public dataReceived: any;
  public ctrl: any;
  public elem: any;
  public attrs: any;
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, config.panelDefaults);
    this.panel.defaultPattern = this.panel.defaultPattern || defaultPattern;
    this.updatePrototypes();
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    this.panel.activePatternIndex = this.panel.activePatternIndex === -1 ? this.panel.patterns.length : this.panel.activePatternIndex;
  }
  private updatePrototypes() {
    Object.setPrototypeOf(this.panel.defaultPattern, BoomPattern.prototype);
    this.panel.patterns.map(pattern => {
      Object.setPrototypeOf(pattern, BoomPattern.prototype);
      return pattern;
    });
  }
  public onDataReceived(data) {
    this.dataReceived = data;
    this.render();
  }
  public onInitEditMode() {
    this.addEditorTab("Patterns", `public/plugins/${plugin_id}/partials/patterns.html`, 2);
    this.addEditorTab("Time based thresholds & Filters", `public/plugins/${plugin_id}/partials/patterns-advanced-options.html`, 3);
    this.addEditorTab("Options", `public/plugins/${plugin_id}/partials/options.html`, 4);
  }
  public addPattern() {
    let newPattern = new BoomPattern({
      row_col_wrapper: this.panel.row_col_wrapper
    });
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  public removePattern(index) {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
    this.render();
  }
  public movePattern(direction, index) {
    let tempElement = this.panel.patterns[index];
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
  }
  public clonePattern(index) {
    let copiedPattern = Object.assign({}, this.panel.patterns[index]);
    Object.setPrototypeOf(copiedPattern, BoomPattern.prototype);
    this.panel.patterns.push(copiedPattern);
    this.render();
  }
  public link(scope, elem, attrs, ctrl) {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;
    this.ctrl = ctrl;
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    let outputdata = this.dataReceived.map(seriesData => {
      return new BoomSeries(seriesData, this.panel.defaultPattern, this.panel.patterns, {});
    });
    let renderingdata = getRenderingData(seriesToTable(outputdata), {
      default_title_for_rows: this.panel.default_title_for_rows || config.default_title_for_rows,
      hide_first_column: this.panel.hide_first_column,
      hide_headers: this.panel.hide_headers
    });
    this.elem.find("#boomtable_output_body_headers").html(`<br/>` + renderingdata.headers);
    this.elem.find('#boomtable_output_body').html(`` + renderingdata.body);
    this.elem.find('#boomtable_output_body_debug').html(``);
    let rootElem = this.elem.find('.table-panel-scroll');
    let maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 71 : this.ctrl.height - 31;
    rootElem.css({ 'max-height': maxheightofpanel + "px" });
  }
};

export {
  GrafanaBoomTableCtrl as PanelCtrl
};
