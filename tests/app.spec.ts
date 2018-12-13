jest.mock("app/core/utils/kbn");
jest.mock("app/core/time_series2");

import { config, computeRenderingData } from "./../src/app/app";

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

describe("Check Output", () => {
    describe("No data", () => {
        let input = get_input_default();
        let input_data = computeRenderingData(input.data, input.patterns, input.defaultPattern, input.panelOptions, input.rendering_options);
        it("Check Error", () => {
            expect(input_data.error).toBe(undefined);
        });
        it("Check Header", () => {
            expect(input_data.output_html.header).toBe(`<br/><tr><th style="padding:4px;text-align:left">${input.rendering_options.default_title_for_rows}</th></tr>`);
        });
        it("Check Body", () => {
            expect(input_data.output_html.body).toBe(``);
        });
        it("Check Footer", () => {
            expect(input_data.output_html.footer).toBe(``);
        });
    });
    describe("Sample data", () => {
        let input = get_input_default();
        let METRIC_NAME = "dev.server_stats.web_1.cpu.usage";
        let METRIC_VALUE = 8885;
        input.data.push({
            target: METRIC_NAME,
            datapoints: [[METRIC_VALUE, 1544715580]]
        })
        let input_data = computeRenderingData(input.data, input.patterns, input.defaultPattern, input.panelOptions, input.rendering_options);
        it("Check Error", () => {
            expect(input_data.error).toBe(undefined);
        });
        it("Check Header", () => {
            expect(input_data.output_html.header).toBe(`<br/><tr><th style=\"padding:4px;text-align:left\">${input.rendering_options.default_title_for_rows}</th><th style=\"padding:4px;text-align:left\">Value</th></tr>`);
        });
        it("Check Body", () => {
            expect(input_data.output_html.body).toBe(`<tr><td style=\"padding:4px;text-align:left\">${METRIC_NAME}</td><td
            style=\"padding:4px;background-color:transparent;text-align:left;color:white\"
          >
            <div
            data-toggle=\"tooltip\"
            data-html=\"true\"
            data-placement=\"left\"
            title=\"Row Name : ${METRIC_NAME} <br/>Col Name : Value <br/>Value : ${METRIC_VALUE}.00\"
            style=\"padding-left:10px\">
                ${METRIC_VALUE}.00
            </div>
          </td></tr>`);
        });
        it("Check Footer", () => {
            expect(input_data.output_html.footer).toBe(``);
        });
    });
    describe("Null data", () => {
        let input = get_input_default();        
        let METRIC_NAME = "dev.server_stats.web_1.cpu.usage";
        input.data.push({
            target: METRIC_NAME,
            datapoints: [[null, 1544715580]]
        })
        let input_data = computeRenderingData(input.data, input.patterns, input.defaultPattern, input.panelOptions, input.rendering_options);
        it("Check Error", () => {
            expect(input_data.error).toBe(undefined);
        });
        it("Check Header", () => {
            expect(input_data.output_html.header).toBe(`<br/><tr><th style=\"padding:4px;text-align:left\">${input.rendering_options.default_title_for_rows}</th><th style=\"padding:4px;text-align:left\">Value</th></tr>`);
        });
        it("Check Body", () => {
            expect(input_data.output_html.body).toBe(`<tr><td style=\"padding:4px;text-align:left\">${METRIC_NAME}</td><td
            style=\"padding:4px;background-color:darkred;text-align:left;color:white\"
          >
            <div
            data-toggle=\"tooltip\"
            data-html=\"true\"
            data-placement=\"left\"
            title=\"Row Name : ${METRIC_NAME} <br/>Col Name : Value <br/>Value : No match found\"
            style=\"padding-left:10px\">
                No data
            </div>
          </td></tr>`);
        });
        it("Check Footer", () => {
            expect(input_data.output_html.footer).toBe(``);
        });
    });
    describe("No data with footer enabled", () => {
        let input = get_input_default();
        input.rendering_options.show_footers = true;
        let input_data = computeRenderingData(input.data, input.patterns, input.defaultPattern, input.panelOptions, input.rendering_options);
        it("Check Footer", () => {
            expect(input_data.output_html.footer).toBe(`<tr><th style="padding:4px;text-align:left">Server</th></tr>`);
        });
    });
});