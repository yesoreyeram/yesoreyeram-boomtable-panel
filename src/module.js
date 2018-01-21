import {
  loadPluginCss,
  MetricsPanelCtrl,
  TimeSeries,
  config
} from "./app/app"

loadPluginCss(config.list_of_stylesheets);

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $sce) {
    super($scope, $injector);
    _.defaults(this.panel, config.panelDefaults);
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
  }
  onInitEditMode() {
    _.each(config.editorTabs, editor => {
      this.addEditorTab(editor.name, "public/plugins/" + config.plugin_id + editor.template, editor.position);
    })
  }
  onDataReceived(data) {
    this.dataReceived = data;
    this.render();
  }
  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints || [],
      alias: seriesData.target
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }
  addPattern() {
    var newPattern = {
      pattern: "^server.*cpu$",
      delimiter: "."
    };
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  removePattern(index) {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = -1;
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    console.log("Rendering");
    // Binding the grafana computations to the metrics received
    this.dataComputed = this.dataReceived.map(this.seriesHandler.bind(this));
    // Assign pattern
    this.dataComputed = this.dataComputed.map(series => {
      series.pattern = _.find(this.panel.patterns.concat(this.panel.defaultPattern), function (p) {
        return series.alias.match(p.pattern || "");
      });
      return series;
    })
    // Assigning computed data to output panel
    this.panel.data = this.dataComputed;
  }
};

GrafanaBoomTableCtrl.templateUrl = "partials/module.html";

export {
  GrafanaBoomTableCtrl as PanelCtrl
};