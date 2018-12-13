///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from "app/core/utils/kbn";
import { loadPluginCss, MetricsPanelCtrl } from "app/plugins/sdk";
import { Pattern, TimeBaseThreshold, ValueNameOption } from "./interfaces/interfaces";
import { plugin_id, config, computeRenderingData } from "./app/app";

loadPluginCss({
  dark: `plugins/${plugin_id}/css/default.dark.css`,
  light: `plugins/${plugin_id}/css/default.light.css`
});

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  static templateUrl: string = "partials/module.html";
  ctrl: any;
  elem: any;
  $sce: any;
  dataReceived: any;
  valueNameOptions: ValueNameOption[] = config.valueNameOptions;
  unitFormats: any = kbn.getUnitFormats();
  optionOverrides: any = config.optionOverrides;
  constructor($scope, $injector, $sce) {
    super($scope, $injector);
    _.defaults(this.panel, config.panelDefaults);
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("data-snapshot-load", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    if (this.panel.activePatternIndex === -1) {
      this.panel.activePatternIndex = this.panel.patterns.length;
    }
    this.$sce = $sce;
  }
  onInitEditMode() {
    this.addEditorTab("Patterns", `public/plugins/${plugin_id}/partials/patterns.html`, 2);
    this.addEditorTab("Options", `public/plugins/${plugin_id}/partials/options.html`, 3);
  }
  onDataReceived(data: any) {
    this.dataReceived = data;
    this.render();
  }
  link(scope, elem, attrs, ctrl) {
    if (scope) { scope = scope; }
    if (attrs) { attrs = attrs; }
    this.ctrl = ctrl;
    this.elem = elem;
  }
  addPattern() {
    let newPattern: Pattern = {
      name: "New Pattern",
      pattern: "^server.*cpu$",
      disabled: false,
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
      enable_TextColors: false,
      textColors: "green|orange|red",
      enable_TextColor_overrides: false,
      textColors_overrides: "0->green|2->red|1->yellow",
      enable_transform: false,
      transform_values: "_value_|_value_|_value_",
      enable_transform_overrides: false,
      transform_values_overrides: "0->down|1->up",
      decimals: 2,
      tooltipTemplate: "Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_",
      format: "none",
      null_color: "darkred",
      null_text_color: "white",
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
    };
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.time_based_thresholds = this.panel.defaultPattern.time_based_thresholds || [];
      this.panel.defaultPattern.time_based_thresholds.push(new_time_based_threshold);
    } else {
      this.panel.patterns[index].time_based_thresholds = this.panel.patterns[index].time_based_thresholds || [];
      this.panel.patterns[index].time_based_thresholds.push(new_time_based_threshold);
    }
    this.render();
  }
  remove_time_based_thresholds(patternIndex: number, index: number) {
    if (patternIndex === this.panel.patterns.length || patternIndex === -1) {
      this.panel.defaultPattern.time_based_thresholds.splice(index, 1);
    } else {
      this.panel.patterns[patternIndex].time_based_thresholds.splice(index, 1);
    }
    this.render();
  }
  inverseBGColors(index: number) {
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.bgColors = this.panel.defaultPattern.bgColors.split("|").reverse().join("|");
    } else {
      this.panel.patterns[index].bgColors = this.panel.patterns[index].bgColors.split("|").reverse().join("|");
    }
    this.render();
  }
  inverseTextColors(index: number) {
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.textColors = this.panel.defaultPattern.textColors.split("|").reverse().join("|");
    } else {
      this.panel.patterns[index].textColors = this.panel.patterns[index].textColors.split("|").reverse().join("|");
    }
    this.render();
  }
  inverseTransformValues(index: number) {
    if (index === this.panel.patterns.length || index === -1) {
      this.panel.defaultPattern.transform_values = this.panel.defaultPattern.transform_values.split("|").reverse().join("|");
    } else {
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
    if (text.split("").length > maxlength) {
      text = text.substring(0, maxlength - 3) + "...";
    }
    return text;
  }
  getOptionOverride(currentOptionOverrides, optionOverrides, propertyName: String) {
    let option = _.find(currentOptionOverrides, o => o.propertyName === propertyName);
    let default_option = _.find(optionOverrides, o => o.propertyName === propertyName);
    if (option) {
      return option.value;
    } else {
      return default_option.defaultValue;
    }
  }
  setOptionOverride(propertyName: String, value: String, text: String) {
    let newOverrides = [];
    if (_.filter(this.panel.currentOptionOverrides, o => o.propertyName === propertyName).length === 0) {
      newOverrides.push({
        propertyName,
        value,
        text
      });
    }
    if (this.panel.currentOptionOverrides.length > 0) {
      _.each(this.panel.currentOptionOverrides, o => {
        if (o.propertyName === propertyName) {
          newOverrides.push({
            propertyName,
            value,
            text
          });
        } else {
          newOverrides.push(o);
        }
      });
    }
    this.panel.currentOptionOverrides = newOverrides;
    this.render();
  }
  removeOptionOverride(option: String) {
    let newOverrides = [];
    if (this.panel.currentOptionOverrides.length > 0) {
      _.each(this.panel.currentOptionOverrides, o => {
        if (o.propertyName !== option) {
          newOverrides.push(o);
        }
      });
    }
    this.panel.currentOptionOverrides = newOverrides;
    this.render();
  }
  adjustPanelHeight(panelHeight: number) {
    let rootElem = this.elem.find(".table-panel-scroll");
    let maxheightofpanel = this.panel.debug_mode ? panelHeight - 71 : panelHeight - 31;
    rootElem.css({ "max-height": maxheightofpanel + "px" });
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  let panelOptions = {
    row_col_wrapper: this.panel.row_col_wrapper,
    no_match_text: this.panel.no_match_text
  };
  let rendering_options = {
    default_title_for_rows: this.panel.default_title_for_rows,
    show_footers: this.getOptionOverride(this.panel.currentOptionOverrides, config.optionOverrides, "SHOW_FOOTERS") === "true",
    hide_headers: this.getOptionOverride(this.panel.currentOptionOverrides, config.optionOverrides, "HIDE_HEADERS") === "true",
    hide_first_column: this.getOptionOverride(this.panel.currentOptionOverrides, config.optionOverrides, "HIDE_FIRST_COLUMN") === "true",
    text_align_table_header: this.getOptionOverride(this.panel.currentOptionOverrides, config.optionOverrides, "TEXT_ALIGN_TABLE_HEADER"),
    text_align_first_column: this.getOptionOverride(this.panel.currentOptionOverrides, config.optionOverrides, "TEXT_ALIGN_FIRST_COLUMN"),
    text_align_table_cells: this.getOptionOverride(this.panel.currentOptionOverrides, config.optionOverrides, "TEXT_ALIGN_TABLE_CELLS"),
  };
  let output = computeRenderingData(this.dataReceived, this.panel.patterns, this.panel.defaultPattern || config.panelDefaults.defaultPattern, panelOptions, rendering_options);
  if (output.error) {
    this.panel.error = output.error;
  } else {
    this.elem.find("#boomtable_output_body_headers").html(output.output_html.header);
    this.elem.find("#boomtable_output_body").html(output.output_html.body);
    this.elem.find("#boomtable_output_body_footers").html(output.output_html.footer);
    this.elem.find("[data-toggle='tooltip']").tooltip();
    if (this.panel.debug_mode === true) {
      this.elem.find("#boomtable_debug_table_holder").html(output.output_html.debug);
    }
  }
  this.adjustPanelHeight(this.ctrl.height);
};

export {
  GrafanaBoomTableCtrl as PanelCtrl
};
