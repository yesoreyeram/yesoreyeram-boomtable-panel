import React from 'react';
import { PanelOptionsEditorItem } from '@grafana/data';
import { IBoomPattern } from "./../app/boom/Boom.interface";
import { BoomPattern } from "./../app/boom/BoomPattern";
import { PatternEditor } from "./Pattern";

interface EditorProps {
    value: IBoomPattern[];
    onChange: (value: IBoomPattern[]) => void;
}
export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    const addPattern = () => {
        let patterns: IBoomPattern[] = value || [];
        let newPattern = new BoomPattern({});
        patterns.push(newPattern);
        onChange(patterns)
    }
    const deletePattern = (index: number) => {
        let patterns: IBoomPattern[] = value || [];
        patterns.splice(index, 1);
        onChange(patterns);
    }
    const clonePattern = (index: number) => {
        let patterns: IBoomPattern[] = value || [];
        let copiedPattern = Object.assign({}, patterns[index]);
        Object.setPrototypeOf(copiedPattern, BoomPattern.prototype);
        patterns.push(copiedPattern);
        onChange(patterns);
    }
    const movePattern = (index: number, direction: 'UP' | 'DOWN') => {
        let patterns: IBoomPattern[] = value || [];
        let tempElement = patterns[index];
        if (direction === 'UP' && index !== 0) {
            patterns[index] = patterns[index - 1];
            patterns[index - 1] = tempElement;
        } else if (direction === 'DOWN' && index !== patterns.length - 1) {
            patterns[index] = patterns[index + 1];
            patterns[index + 1] = tempElement;
        }
        onChange(patterns);
    }
    const onPatternChange = (pattern: IBoomPattern, index: number) => {
        let patterns: IBoomPattern[] = value || [];
        patterns[index] = pattern;
        onChange(patterns);
    }
    return <>
        {
            value.map((pattern, index) => <div>
                <PatternEditor value={pattern} onChange={(p) => onPatternChange(p, index)} isDefaultPattern={false} />
                <i className="fa fa-arrow-up btn btn-secondary px-2" onClick={() => movePattern(index, 'UP')} ></i>
                <i className="fa fa-arrow-down btn btn-secondary px-2" onClick={() => movePattern(index, 'DOWN')} ></i>
                <i className="fa fa-clone btn btn-info px-2" onClick={() => clonePattern(index)}></i>
                <i className="fa fa-trash btn btn-danger px-2" onClick={() => deletePattern(index)}></i>
            </div>)
        }
        <br />
        <button className="btn btn-primary" onClick={addPattern}>Add New Pattern</button>
    </>
}

export const PatternsOptions: PanelOptionsEditorItem = {
    "id": "patterns",
    "name": "Additional Patterns",
    "path": "patterns",
    "category": ["Patterns"],
    "editor": Editor
}