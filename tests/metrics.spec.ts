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
        }];
        input.rendering_options.default_title_for_rows = "Server Name";
        input.defaultPattern.row_name = "_2_ _fa-circle,green_";
        input.defaultPattern.col_name = "_3_ _fa-circle,white,2_";
        input.defaultPattern.format = "percent";
        input.defaultPattern.decimals = 4;
        let input_data = computeRenderingData(input.data, input.patterns, input.defaultPattern, input.panelOptions, input.rendering_options, false);
        console.log(input_data.output_html.header);
        it("Check Error", () => {
            expect(input_data.error).toBe(undefined);
        });
        it("Check Header", () => {
            expect(input_data.output_html.header).toBe(`<br/><tr><th style="padding:4px;text-align:left">${input.rendering_options.default_title_for_rows}</th><th style="padding:4px;text-align:left">cpu <i class="fa fa-circle" style="color:white"></i> <i class="fa fa-circle" style="color:white"></i> </th><th style="padding:4px;text-align:left">mem <i class="fa fa-circle" style="color:white"></i> <i class="fa fa-circle" style="color:white"></i> </th></tr>`);
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
    })
});