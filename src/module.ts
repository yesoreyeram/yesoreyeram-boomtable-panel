///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from 'app/core/utils/kbn';
import { loadPluginCss, MetricsPanelCtrl } from "app/plugins/sdk";
import { Pattern, TimeBaseThreshold, ValueNameOption } from "./interfaces/interfaces";
import { plugin_id, config } from "./app/app";
import { compute, defaultHandler } from "./app/seriesHandler";
import * as renderer from "./app/renderer"
import * as utils from "./app/utils";

loadPluginCss({
  dark: `plugins/${plugin_id}/css/default.dark.css`,
  light: `plugins/${plugin_id}/css/default.light.css`
});

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  static templateUrl: string = "partials/module.html";
  ctrl: any;
  elem: any;
  dataReceived: any;
  valueNameOptions: ValueNameOption[] = config.valueNameOptions;
  unitFormats: any = kbn.getUnitFormats();
  optionOverrides: any = config.optionOverrides;
  constructor($scope, $injector, $sce) {
    super($scope, $injector);
    _.defaults(this.panel, config.panelDefaults);
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    if (this.panel.activePatternIndex === -1) {
      this.panel.activePatternIndex = this.panel.patterns.length;
    }
  }
  onInitEditMode() {
    this.addEditorTab("Patterns", `public/plugins/${plugin_id}/partials/patterns.html`, 2);
    this.addEditorTab("Options", `public/plugins/${plugin_id}/partials/options.html`, 3);
  }
  onDataReceived(data: any) {
    this.dataReceived = data;
    this.render();
  }
  addPattern() {
    let newPattern: Pattern = {
      name: "New Pattern",
      pattern: "^server.*cpu$",
      delimiter: ".",
      valueName: "avg",
      row_name: this.panel.row_col_wrapper + "0" + this.panel.row_col_wrapper,
      col_name: this.panel.row_col_wrapper + "1" + this.panel.row_col_wrapper,
      thresholds: "70,90",
      time_based_thresholds: [],
      enable_time_based_thresholds: false,
      enable_bgColor: false,
      bgColors: "green|orange|red",
      enable_bgColor_overrides: false,
      bgColors_overrides: "0->green|2->red|1->yellow",
      enable_transform: false,
      transform_values: "_value_|_value_|_value_",
      enable_transform_overrides: false,
      transform_values_overrides: "0->down|1->up",
      decimals: 2,
      format: "none",
      null_color: "darkred",
      null_value: "No data",
      enable_clickable_cells: false,
      clickable_cells_link: "",
      filter: {
        value_below: "",
        value_above: "",
      }
    };
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  movePattern(direction: String, index: number) {
    let tempElement: Pattern = this.panel.patterns[index];
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
  removePattern(index: number) {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
    this.render();
  }
  clonePattern(index: number) {
    let copiedPattern: Pattern = Object.assign({}, this.panel.patterns[index]);
    this.panel.patterns.push(copiedPattern);
    this.render();
  }
  add_time_based_thresholds(index: number) {
    let new_time_based_threshold: TimeBaseThreshold = {
      name: "Early morning of everyday",
      from: "0000",
      to: "0530",
      enabledDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
      threshold: "70,90"
    }
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.time_based_thresholds = this.panel.defaultPattern.time_based_thresholds || [];
      this.panel.defaultPattern.time_based_thresholds.push(new_time_based_threshold);
    }
    else {
      this.panel.patterns[index].time_based_thresholds = this.panel.patterns[index].time_based_thresholds || [];
      this.panel.patterns[index].time_based_thresholds.push(new_time_based_threshold);
    }
    this.render();
  }
  remove_time_based_thresholds(patternIndex: number, index: number) {
    if (patternIndex === this.panel.patterns.length || patternIndex === -1) {
      this.panel.defaultPattern.time_based_thresholds.splice(index, 1);
    }
    else {
      this.panel.patterns[patternIndex].time_based_thresholds.splice(index, 1);
    }
    this.render();
  }
  inverseBGColors(index: number) {
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.bgColors = this.panel.defaultPattern.bgColors.split("|").reverse().join("|");
    }
    else {
      this.panel.patterns[index].bgColors = this.panel.patterns[index].bgColors.split("|").reverse().join("|");
    }
    this.render();
  }
  inverseTransformValues(index: number) {
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.transform_values = this.panel.defaultPattern.transform_values.split("|").reverse().join("|");
    }
    else {
      this.panel.patterns[index].transform_values = this.panel.patterns[index].transform_values.split("|").reverse().join("|");
    }

    this.render();
  }
  setUnitFormat(subItem, index: number) {
    if (index === this.panel.patterns.length || index === this.panel.patterns.length) {
      this.panel.defaultPattern.format = subItem.value;
    } else {
      this.panel.patterns[index].format = subItem.value;
    }
    this.render();
  }
  limitText(text: String, maxlength: number) {
    if (text.split('').length > maxlength) {
      text = text.substring(0, maxlength - 3) + "...";
    }
    return text;
  }
  link(scope, elem, attrs, ctrl) {
    this.ctrl = ctrl;
    this.elem = elem;
  }
  getOptionOverride(propertyName: String) {
    let option = _.find(this.panel.currentOptionOverrides, o => o.propertyName === propertyName);
    let default_option = _.find(config.optionOverrides, o => o.propertyName === propertyName);
    if (option) {
      return option.value
    }
    else return default_option.defaultValue;
  }
  setOptionOverride(propertyName: String, value: String, text: String) {
    let newOverrides = [];
    if (_.filter(this.panel.currentOptionOverrides, o => o.propertyName === propertyName).length === 0) {
      newOverrides.push({
        propertyName,
        value,
        text
      })
    }
    if (this.panel.currentOptionOverrides.length > 0) {
      _.each(this.panel.currentOptionOverrides, o => {
        if (o.propertyName === propertyName) {
          newOverrides.push({
            propertyName,
            value,
            text
          })
        }
        else newOverrides.push(o);
      })
    }
    this.panel.currentOptionOverrides = newOverrides;
    this.render();
  }
  removeOptionOverride(option: String) {
    let newOverrides = [];
    if (this.panel.currentOptionOverrides.length > 0) {
      _.each(this.panel.currentOptionOverrides, o => {
        if (o.propertyName !== option) {
          newOverrides.push(o)
        }
      })
    }
    this.panel.currentOptionOverrides = newOverrides;
    this.render();
  }
  adjustPanelHeight(panelHeight: number) {
    let rootElem = this.elem.find('.table-panel-scroll');
    let maxheightofpanel = this.panel.debug_mode ? panelHeight - 71 : panelHeight - 31;
    rootElem.css({ 'max-height': maxheightofpanel + "px" });
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    this.panel.default_title_for_rows = this.panel.default_title_for_rows;
    let metricsReceived = utils.getFields(this.dataReceived, "target");
    if (metricsReceived.length !== _.uniq(metricsReceived).length) {
      let duplicateKeys = _.uniq(metricsReceived.filter(v => {
        return metricsReceived.filter(t => t === v).length > 1
      }));
      this.panel.error = utils.buildError(`Duplicate keys found`, `Duplicate key values : <br/> ${duplicateKeys.join("<br/> ")}`)
    } else {
      this.panel.error = undefined;
      let dataComputed = compute(this.dataReceived.map(defaultHandler.bind(this)), this.panel.defaultPattern || config.panelDefaults.defaultPattern, this.panel.patterns, this.panel.row_col_wrapper);
      let rows_found = utils.getFields(dataComputed, "row_name");
      let cols_found = utils.getFields(dataComputed, "col_name");
      let keys_found = utils.getFields(dataComputed, "key_name");
      let is_unique_keys = (keys_found.length === _.uniq(keys_found).length);
      if (is_unique_keys) {
        this.panel.error = undefined;
        let output = [];
        _.each(_.uniq(rows_found), (row_name) => {
          let o: any = {};
          o.row = row_name;
          o.cols = [];
          _.each(_.uniq(cols_found), (col_name) => {
            let matched_value = (_.find(dataComputed, (e) => {
              return e.row_name === row_name && e.col_name === col_name
            }));
            if (!matched_value) matched_value = {
              value: NaN,
              displayValue: this.panel.no_match_text || "N/A"
            };
            o.cols.push({
              "name": col_name,
              "value": matched_value.value,
              "actual_col_name": matched_value.actual_col_name,
              "actual_row_name": matched_value.actual_row_name,
              "displayValue": matched_value.displayValue || matched_value.value,
              "bgColor": matched_value.bgColor || "transparent"
            });
          });
          output.push(o);
        })
        renderer.buildHTML(this.elem, this.getOptionOverride("HIDE_HEADERS") === "true", this.getOptionOverride("HIDE_FIRST_COLUMN") === "true", this.getOptionOverride("TEXT_ALIGN_TABLE_HEADER"), cols_found, output, this.getOptionOverride("TEXT_ALIGN_FIRST_COLUMN"), this.getOptionOverride("TEXT_ALIGN_TABLE_CELLS"), this.panel.default_title_for_rows);
      } else {
        let duplicateKeys = _.uniq(keys_found.filter(v => {
          return keys_found.filter(t => t === v).length > 1
        }));
        this.panel.error = utils.buildError(`Duplicate keys found`, `Duplicate key values : <br/> ${duplicateKeys.join("<br/> ")}`)
      }
      renderer.buildDebugHTML(this.elem, dataComputed);
    }
    this.adjustPanelHeight(this.ctrl.height);
  }
};

export {
  GrafanaBoomTableCtrl as PanelCtrl
};