import { PanelPlugin, PanelModel, PanelOptionsEditorBuilder } from "@grafana/data";
import { Panel } from "./panel";
import { PanelOptions } from "./app/boom/Boom.interface"
import { DefaultPatternOptions } from "./editors/DefaultPattern";
import { PatternsOptions } from "./editors/Patterns";

export const plugin = new PanelPlugin<PanelOptions>(Panel)
    .setPanelOptions((builder: PanelOptionsEditorBuilder<PanelOptions>) => {
        builder
            .addCustomEditor(DefaultPatternOptions)
            .addCustomEditor(PatternsOptions)
            .addTextInput({
                "name": "Default Title for Rows",
                "path": "default_title_for_rows",
                "category": ["Advanced Options"]
            }).addTextInput({
                "name": "Default Title for Columns",
                "path": "defaultPattern.col_name",
                "category": ["Advanced Options"]
            })
            .addTextInput({
                "name": "Row Column Wrapper",
                "path": "row_col_wrapper",
                "category": ["Advanced Options"]
            })
            .addTextInput({
                "path": "First Column link",
                "name": "first_column_link",
                "category": ["Advanced Options"]
            })
            .addTextInput({
                "path": "Font Size",
                "name": "font_size",
                "category": ["Advanced Options"]
            })
            .addSelect({
                "name": "Text Alignment - First Column",
                "path": "text_alignment_firstcolumn",
                "defaultValue": "LEFT",
                "category": ["Advanced Options"],
                "settings": {
                    "options": [
                        { label: "Center", value: "CENTER" },
                        { label: "Left", value: "LEFT" },
                        { label: "Right", value: "RIGHT" }
                    ]
                }
            })
            .addSelect({
                "name": "Text Alignment - Values",
                "path": "text_alignment_values",
                "defaultValue": "LEFT",
                "category": ["Advanced Options"],
                "settings": {
                    "options": [
                        { label: "Center", value: "CENTER" },
                        { label: "Left", value: "LEFT" },
                        { label: "Right", value: "RIGHT" }
                    ]
                }
            })
            .addSelect({
                "name": "Text Alignment - Header",
                "path": "text_alignment_header",
                "defaultValue": "LEFT",
                "category": ["Advanced Options"],
                "settings": {
                    "options": [
                        { label: "Center", value: "CENTER" },
                        { label: "Left", value: "LEFT" },
                        { label: "Right", value: "RIGHT" }
                    ]
                }
            })
            .addBooleanSwitch({
                "name": "Hide Header",
                "path": "hide_headers",
                "category": ["Advanced Options"]
            })
            .addBooleanSwitch({
                "name": "Debug ?",
                "path": "debug_mode",
                "defaultValue": false,
                "category": ["Advanced Options"]
            })
            .addTextInput({
                "name": "Text for non matching cells",
                "path": "non_matching_cells_text",
                "category": ["Non Matching cells"]
            })
            .addColorPicker({
                "name": "Text color for non matching cells",
                "path": "non_matching_cells_color_text",
                "category": ["Non Matching cells"]
            })
            .addColorPicker({
                "name": "BG Color for non matching cells",
                "path": "non_matching_cells_color_bg",
                "category": ["Non Matching cells"]
            });
        return builder;
    })
    .setMigrationHandler((panel: PanelModel<PanelOptions> & Record<string, any>) => {
        const newOptions = {
            default_title_for_rows: panel.options.default_title_for_rows ?? panel.default_title_for_rows,
            activePatternIndex: panel.options.activePatternIndex ?? panel.activePatternIndex,
            defaultPattern: panel.options.defaultPattern ?? panel.defaultPattern,
            patterns: panel.options.patterns ?? panel.patterns,
            row_col_wrapper: panel.options.row_col_wrapper ?? panel.row_col_wrapper,
            sorting_props: panel.options.sorting_props ?? panel.sorting_props
        };
        const previousVersion = parseFloat(panel.pluginVersion || '2.0');
        if (previousVersion < 2.0) {
            const oldProps = ['default_title_for_rows', 'activePatternIndex', 'defaultPattern', 'patterns', 'row_col_wrapper', 'sorting_props'];
            oldProps.forEach(prop => delete panel[prop]);
        }
        return newOptions;
    });