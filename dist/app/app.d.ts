import { Pattern } from "../interfaces/interfaces";
declare const computeRenderingData: (data: any, patterns: Pattern[], defaultPattern: Pattern, panelOptions: any, rendering_options: any, debug_mode: boolean) => {
    error: any;
    output_html: {
        header: string;
        body: string;
        footer: string;
        debug: string;
    };
};
declare const getOptionOverride: (currentOptionOverrides: any, propertyName: String) => any;
export { computeRenderingData, getOptionOverride };
