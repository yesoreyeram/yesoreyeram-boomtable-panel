class BoomTableTimeBasedThreshold {
    public enabledDays: String;
    public from: String;
    public name: String;
    public threshold: String;
    public to: String;
    constructor() {
        this.enabledDays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat";
        this.from = "0000";
        this.name = "Early morning of everyday";
        this.threshold = "70,90";
        this.to = "0530";
    }
}

class BoomTablePattern {
    private row_col_wrapper: String = "_";
    public bgColors: String;
    public bgColors_overrides: String;
    public clickable_cells_link: String;
    public col_name: String;
    public decimals: Number;
    public delimiter: String;
    public enable_bgColor: Boolean;
    public enable_bgColor_overrides: Boolean;
    public enable_clickable_cells: Boolean;
    public enable_time_based_thresholds: Boolean;
    public enable_transform: Boolean;
    public enable_transform_overrides: Boolean;
    public filter: {
        value_above: String;
        value_below: String;
    };
    public format: String;
    public name: String;
    public null_color: String;
    public null_value: String;
    public pattern: String;
    public row_name: String;
    public thresholds: String;
    public time_based_thresholds: BoomTableTimeBasedThreshold[];
    public transform_values: String;
    public transform_values_overrides: String;
    public valueName: String;
    public inverseBGColors;
    public inverseTransformValues;
    public add_time_based_thresholds;
    public remove_time_based_thresholds;
    constructor(options: any) {
        if (options && options.row_col_wrapper) {
            this.row_col_wrapper = options.row_col_wrapper;
        }
        this.bgColors = options && options.bgColors ? options.bgColors : "green|orange|red";
        this.bgColors_overrides = options && options.bgColors_overrides ? options.bgColors_overrides : "0->green|2->red|1->yellow";
        this.clickable_cells_link = options && options.clickable_cells_link ? options.clickable_cells_link : "";
        this.col_name = options && options.col_name ? options.col_name : this.row_col_wrapper + "1" + this.row_col_wrapper;
        this.decimals = options && options.decimals ? options.decimals : 2;
        this.delimiter = options && options.delimiter ? options.delimiter : ".";
        this.enable_bgColor = false;
        this.enable_bgColor_overrides = false;
        this.enable_clickable_cells = false;
        this.enable_time_based_thresholds = false;
        this.enable_transform = false;
        this.enable_transform_overrides = false;
        this.filter = {
            value_above: "",
            value_below: "",
        };
        this.format = options && options.format ? options.format : "none";
        this.name = options && options.name ? options.name : "New Pattern";
        this.null_color = options && options.null_color ? options.null_color : "darkred";
        this.null_value = options && options.null_value ? options.null_value : "No data";
        this.pattern = options && options.pattern ? options.pattern : "^server.*cpu$";
        this.row_name = options && options.row_name ? options.row_name : this.row_col_wrapper + "0" + this.row_col_wrapper;
        this.thresholds = options && options.thresholds ? options.thresholds : "70,90";
        this.time_based_thresholds = [];
        this.transform_values = options && options.transform_values ? options.transform_values : "_value_|_value_|_value_";
        this.transform_values_overrides = options && options.transform_values_overrides ? options.transform_values_overrides : "0->down|1->up";
        this.valueName = options && options.valueName ? options.valueName : "avg";
    }
}

BoomTablePattern.prototype.inverseBGColors = function () {
    this.bgColors = this.bgColors ? this.bgColors.split("|").reverse().join("|") : "";
};

BoomTablePattern.prototype.inverseTransformValues = function () {
    this.transform_values = this.transform_values ? this.transform_values.split("|").reverse().join("|") : "";
};

BoomTablePattern.prototype.add_time_based_thresholds = function () {
    let new_time_based_threshold = new BoomTableTimeBasedThreshold();
    this.time_based_thresholds = this.time_based_thresholds || [];
    this.time_based_thresholds.push(new_time_based_threshold);
};

BoomTablePattern.prototype.remove_time_based_thresholds = function (index) {
    if (this.time_based_thresholds.length > 0) {
        this.time_based_thresholds.splice(index, 1);
    }
};

export {
    BoomTablePattern,
    BoomTableTimeBasedThreshold
};
