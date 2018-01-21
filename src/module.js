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
    console.log("Edit mode activated");
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
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    console.log("Rendering");
    // Binding the grafana computations to the metrics received
    this.dataComputed = this.dataReceived.map(this.seriesHandler.bind(this));
    // Assigning computed data to output panel
    this.panel.data = this.dataComputed;
  }
};

GrafanaBoomTableCtrl.templateUrl = "partials/module.html";

export {
  GrafanaBoomTableCtrl as PanelCtrl
};