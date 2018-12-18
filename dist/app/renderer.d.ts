import { Series, Pattern } from "./../interfaces/interfaces";
declare let buildOutputData: (dataComputed: Series[], rows_found: String[], cols_found: String[], defaultPattern: Pattern, options: any) => any[];
declare let output: (output: any[], cols_found: any, options: any) => {
    header: String;
    body: String;
    footer: String;
};
declare let output_debug: (dataComputed: Series[]) => String;
declare let getTooltipMessage: (template: String, row_name: String, col_name: String, value: Number) => String;
export { getTooltipMessage, buildOutputData, output as buildOutput, output_debug as buildDebugOutput };
