jest.mock("app/core/utils/kbn");
jest.mock("app/core/time_series2");

import _ from "lodash";
import { config } from "./../src/app/config";
import { computeRenderingData } from "./../src/app/app";

let get_input_default = function () {
    return {
        data: [],
        patterns: [],
        defaultPattern: config.panelDefaults.defaultPattern,
        panelOptions: {
            row_col_wrapper: "_",
            no_match_text: "No match found"
        },
        rendering_options: {
            default_title_for_rows: "Server",
            show_footers: false,
            hide_headers: false,
            hide_first_column: false,
            text_align_table_header: "left",
            text_align_first_column: "left",
            text_align_table_cells: "left"
        }
    }
};

describe("Check Metrics Ouput", () => {
    describe("E2E", () => {
        let input = get_input_default();
        input.data = [{
            target: "dev.server_stats.web_1.cpu.usage",
            datapoints: [[20, 1544715580], [40, 1544715590], [60, 1544715600]]
        }, {
            target: "dev.server_stats.web_1.mem.usage",
            datapoints: [[30, 1544715580], [30, 1544715590], [60, 1544715600]]
        }, {
            target: "dev.server_stats.web_2.cpu.usage",
            datapoints: [[200, 1544715580], [400, 1544715590], [600, 1544715600]]
        }, {
            target: "dev.server_stats.web_2.mem.usage",
            datapoints: [[320, 1544715580], [320, 1544715590], [620, 1544715600]]
        }, {
            target: "dev.server_stats.web_3.cpu.usage",
            datapoints: [[200, 1544715580], [400, 1544715590], [600, 1544715600]]
        }, {
            target: "dev.server_stats.web_3.mem.usage",
            datapoints: [[320, 1544715580], [320, 1544715590], [620, 1544715600]]
        }, {
            target: "dev.server_stats.web_4.cpu.usage",
            datapoints: [[200, 1544715580], [400, 1544715590], [600, 1544715600]]
        }, {
            target: "dev.server_stats.web_4.mem.usage",
            datapoints: [[320, 1544715580], [320, 1544715590], [620, 1544715600]]
        }];
        input.rendering_options.default_title_for_rows = "Server Name";
        input.defaultPattern.row_name = "_2_ _fa-circle,green_";
        input.defaultPattern.col_name = "_3_ _fa-circle,white,2_";
        input.defaultPattern.format = "percent";
        input.defaultPattern.thresholds = "20,30";
        input.defaultPattern.enable_bgColor = true;
        input.defaultPattern.bgColors = "green|yellow|pink";
        input.defaultPattern.enable_bgColor_overrides = true;
        input.defaultPattern.bgColors_overrides = "421->navyblue|420->darkgreen";
        input.defaultPattern.enable_TextColors = true;
        input.defaultPattern.textColors = "darkgreen|darkwhite|purple";
        input.defaultPattern.enable_TextColor_overrides = true;
        input.defaultPattern.textColors_overrides = "421->yellowishred|420->skyblue";
        input.defaultPattern.enable_transform = true;
        input.defaultPattern.transform_values = "OK _value_|Better _value_|Bad _value_";
        input.defaultPattern.enable_transform_overrides = true;
        input.defaultPattern.transform_values_overrides = "421->Something wrong|420->Something really wrong";
        input.defaultPattern.decimals = 4;        
        let newPattern = {
            name: "Web 4",
            pattern: "web_4.cpu",
            disabled: false,
            delimiter: ".",
            valueName: "avg",
            row_name: "_2_ _fa-circle,green_",
            col_name:  "_3_ _fa-circle,white,2_",
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
            tooltipTemplate: "Series : _series_ | Value : _value_",
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
        input.patterns.push(newPattern);
        let input_data = computeRenderingData(input.data, input.patterns, input.defaultPattern, input.panelOptions, input.rendering_options, false);
        it("Check Error", () => {
            expect(input_data.error).toBe(undefined);
        });
        it("Check Header", () => {
            expect(input_data.output_html.header.replace(/\ /g,"")).toBe(`<br/><tr><th style="padding:4px;text-align:left">${input.rendering_options.default_title_for_rows}</th><th style="padding:4px;text-align:left">cpu <i class="fa fa-circle" style="color:white"></i> <i class="fa fa-circle" style="color:white"></i> </th><th style="padding:4px;text-align:left">mem <i class="fa fa-circle" style="color:white"></i> <i class="fa fa-circle" style="color:white"></i> </th></tr>`.replace(/\ /g,""));
        });
        it("Check tooltip", () => {
            expect(input_data.output_html.body).toContain('title="Series : dev.server_stats.web_1.cpu.usage | Value : 40.0000%"');
        });
        it("Check Value is average", () => {
            expect(input_data.output_html.body).toContain('title="Series : dev.server_stats.web_1.cpu.usage | Value : 40.0000%"');
        });
        it("Check Value is formatted", () => {
            expect(input_data.output_html.body).toContain('title="Series : dev.server_stats.web_2.mem.usage | Value : 420.0000%"');
        });
        it("Check Font Awesome transformation in col name", () => {
            expect(input_data.output_html.header).toContain(`cpu <i class="fa fa-circle" style="color:white"></i> <i class="fa fa-circle" style="color:white"></i>`);
        })
        it("Check Font Awesome transformation in row name", () => {
            expect(input_data.output_html.body).toContain('web_1 <i class="fa fa-circle" style="color:rgba(50, 172, 45, 0.97)"></i>');
        });
        it("Check BG Color, Text Color based on threshold", () => {
            expect(input_data.output_html.body.replace(/\ /g, "")).toContain(`<td style="padding:4px;text-align:left">web_1 <i class="fa fa-circle" style="color:rgba(50, 172, 45, 0.97)"></i> </td><td
            style="padding:4px;background-color:pink;text-align:left;color:purple"
          >
            <div
            data-toggle="tooltip"
            data-html="true"
            data-placement="auto"
            title="Series : dev.server_stats.web_1.cpu.usage | Value : 40.0000%"
            style="padding-left:10px">
                Bad 40.0000%
            </div>
          </td>`.replace(/\ /g, ""))
        });
        it("Check BG Color, Text Color based on overrides", () => {
            expect(input_data.output_html.body.replace(/\ /g, "")).toContain(`<td style="padding:4px;text-align:left">web_3 <i class="fa fa-circle" style="color:rgba(50, 172, 45, 0.97)"></i> </td><td
            style="padding:4px;background-color:pink;text-align:left;color:purple"
          >
            <div
            data-toggle="tooltip"
            data-html="true"
            data-placement="auto"
            title="Series : dev.server_stats.web_3.cpu.usage | Value : 400.0000%"
            style="padding-left:10px">
                Bad 400.0000%
            </div>
          </td> <td
          style="padding:4px;background-color:darkgreen;text-align:left;color:skyblue"
        >
          <div
          data-toggle="tooltip"
          data-html="true"
          data-placement="auto"
          title="Series : dev.server_stats.web_3.mem.usage | Value : 420.0000%"
          style="padding-left:10px">
                Something really wrong
          </div>
        </td>`.replace(/\ /g, ""))
        });
        it("Check BG Color, Text Color based on threshold for override pattern", () => {
            expect(input_data.output_html.body.replace(/\ /g, "")).toContain(`<td style="padding:4px;text-align:left">web_4 <i class="fa fa-circle" style="color:rgba(50, 172, 45, 0.97)"></i> </td><td
            style="padding:4px;background-color:transparent;text-align:left;color:white"
          >
            <div
            data-toggle="tooltip"
            data-html="true"
            data-placement="auto"
            title="Series : dev.server_stats.web_4.cpu.usage | Value : 400.00"
            style="padding-left:10px">
                400.00
            </div>
          </td><td
          style="padding:4px;background-color:darkgreen;text-align:left;color:skyblue"
        >
          <div
          data-toggle="tooltip"
          data-html="true"
          data-placement="auto"
          title="Series : dev.server_stats.web_4.mem.usage | Value : 420.0000%"
          style="padding-left:10px">
              Something really wrong
          </div>
        </td>`.replace(/\ /g, ""))
        });
    })
});