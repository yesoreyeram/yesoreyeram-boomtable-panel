import kbn from "app/core/utils/kbn";
import { loadPluginCss, MetricsPanelCtrl } from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";
import { config } from "./app/config";

loadPluginCss({
  dark: "plugins/" + config.plugin_id + "/css/default.dark.css",
  light: "plugins/" + config.plugin_id + "/css/default.light.css"
});

const panelDefaults = {
  plugin_title: config.title,
  nullPointMode: "connected"
};

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $sce) {
    super($scope, $injector);
    _.defaults(this.panel, panelDefaults);
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
  }
  onInitEditMode() {
    console.log("Edit mode activated");
  }
  onDataReceived(data) {
    console.log("Data received");
    this.dataComputed = data.map(this.seriesHandler.bind(this));
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

GrafanaBoomTableCtrl.prototype.render = function() {
  console.log("Rendering");
  this.panel.data = this.dataComputed;
};

GrafanaBoomTableCtrl.templateUrl = "module.html";

export { GrafanaBoomTableCtrl as PanelCtrl };
