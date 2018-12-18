import { Config, Pattern } from "../interfaces/interfaces";
declare const plugin_id: String;
declare const config: Config;
declare const computeRenderingData: (data: any, patterns: Pattern[], defaultPattern: Pattern, panelOptions: any, rendering_options: any) => {
    error: any;
    output_html: {
        header: string;
        body: string;
        footer: string;
        debug: string;
    };
};
export { plugin_id, config, computeRenderingData };
