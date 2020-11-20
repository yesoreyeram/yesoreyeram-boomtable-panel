import React from 'react';
import { PanelOptionsEditorItem } from '@grafana/data';
import { IBoomPattern } from "./../app/boom/Boom.interface";
import { PatternEditor } from "./Pattern";

interface EditorProps {
    value: IBoomPattern;
    onChange: (value: IBoomPattern) => void;
}
export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    return <>
        <PatternEditor value={value} onChange={onChange} isDefaultPattern={true} />
    </>
}

export const DefaultPatternOptions: PanelOptionsEditorItem = {
    "id": "defaultPattern",
    "name": "Default Pattern",
    "path": "defaultPattern",
    "category": ["Patterns"],
    "editor": Editor
}