///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from 'app/core/utils/kbn';
import { loadPluginCss, MetricsPanelCtrl } from "app/plugins/sdk";
import { IBoomSeries, IBoomRenderingOptions, IBoomTable, IBoomHTML } from "./app/boom/index";
import { BoomPattern, BoomSeries } from "./app/boom/index";
import { plugin_id, value_name_options, config } from "./app/config";
import { defaultPattern, seriesToTable, getRenderingHTML, getDebugData } from "./app/app";

loadPluginCss({
  dark: `plugins/${plugin_id}/css/default.dark.css`,
  light: `plugins/${plugin_id}/css/default.light.css`
});

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  public static templateUrl = "partials/module.html";
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
    this.events.on("data-snapshot-load", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    this.panel.activePatternIndex = this.panel.activePatternIndex === -1 ? this.panel.patterns.length : this.panel.activePatternIndex;
  }
  private updatePrototypes(): void {
    Object.setPrototypeOf(this.panel.defaultPattern, BoomPattern.prototype);
    this.panel.patterns.map(pattern => {
      Object.setPrototypeOf(pattern, BoomPattern.prototype);
      return pattern;
    });
  }
  public onDataReceived(data: any): void {
    this.dataReceived = data;
    this.render();
  }
  public onInitEditMode(): void {
    this.addEditorTab("Patterns", `public/plugins/${plugin_id}/partials/patterns.html`, 2);
    this.addEditorTab("Options", `public/plugins/${plugin_id}/partials/options.html`, 3);
  }
  public addPattern(): void {
    let newPattern = new BoomPattern({
      row_col_wrapper: this.panel.row_col_wrapper
    });
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  public removePattern(index: Number): void {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
    this.render();
  }
  public movePattern(direction: string, index: Number) {
    let tempElement = this.panel.patterns[Number(index)];
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
  }
  public clonePattern(index: Number): void {
    let copiedPattern = Object.assign({}, this.panel.patterns[Number(index)]);
    Object.setPrototypeOf(copiedPattern, BoomPattern.prototype);
    this.panel.patterns.push(copiedPattern);
    this.render();
  }
  public limitText(text: string, maxlength: Number): string {
    if (text.split('').length > maxlength) {
      text = text.substring(0, Number(maxlength) - 3) + "...";
    }
    return text;
  }
  public link(scope: any, elem: any, attrs: any, ctrl: any): void {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;
    this.ctrl = ctrl;
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    let outputdata: IBoomSeries[] = this.dataReceived.map(seriesData => {
      let seriesOptions = {
        debug_mode: this.panel.debug_mode,
        row_col_wrapper: this.panel.row_col_wrapper || "_"
      };
      return new BoomSeries(seriesData, this.panel.defaultPattern, this.panel.patterns, seriesOptions);
    });
    let renderingOptions: IBoomRenderingOptions = {
      default_title_for_rows: this.panel.default_title_for_rows || config.default_title_for_rows,
      hide_first_column: this.panel.hide_first_column,
      hide_headers: this.panel.hide_headers,
      non_matching_cells_color_bg: this.panel.non_matching_cells_color_bg,
      non_matching_cells_color_text: this.panel.non_matching_cells_color_text,
      non_matching_cells_text: this.panel.non_matching_cells_text,
      text_alignment_firstcolumn: this.panel.text_alignment_firstcolumn,
      text_alignment_header: this.panel.text_alignment_header,
      text_alignment_values: this.panel.text_alignment_values
    };
    let boomtabledata: IBoomTable = seriesToTable(outputdata,renderingOptions);
    let renderingdata: IBoomHTML = getRenderingHTML(boomtabledata, renderingOptions);
    this.elem.find("#boomtable_output_body_headers").html(`<br/>` + renderingdata.headers);
    this.elem.find('#boomtable_output_body').html(`` + renderingdata.body);
    this.elem.find('#boomtable_output_body_debug').html(this.panel.debug_mode ? getDebugData(outputdata) : ``);
    this.elem.find("[data-toggle='tooltip']").tooltip({
      boundary: "scrollParent"
    });
    let rootElem = this.elem.find('.table-panel-scroll');
    let maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 111 : this.ctrl.height - 31;
    rootElem.css({ 'max-height': maxheightofpanel + "px" });
  }
};

export {
  GrafanaBoomTableCtrl as PanelCtrl
};
