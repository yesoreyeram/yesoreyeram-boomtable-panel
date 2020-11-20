import React, { useState } from 'react';
import { set } from "lodash";
import { Modal, Input, Label } from "@grafana/ui";
import { IBoomPattern } from "./../app/boom/Boom.interface";

interface EditorProps {
    isDefaultPattern: boolean;
    value: IBoomPattern;
    onChange: (value: IBoomPattern) => void;
}
export const PatternEditor: React.FC<EditorProps> = ({ value, isDefaultPattern, onChange }) => {

    const [editorVisibility, setEditorVisibility] = useState(false);

    const changeText = (field: string, text: string) => {
        set(value, field, text)
        onChange(value);
    }

    return <>
        <span className="btn width-18">{value.name}</span>
        <i className="fa fa-edit btn btn-primary px-2" onClick={() => setEditorVisibility(true)}></i>
        <Modal isOpen={editorVisibility} onDismiss={() => setEditorVisibility(false)} title={`Edit ${value.name}`}>
            <h3>Pattern</h3>
            <Label>Name</Label>
            {
                isDefaultPattern ? <Label>Default Pattern</Label> : <Input css={{}} type="textbox" value={value.name} onChange={(e) => changeText('name', e.currentTarget.value)} />
            }
            <Label>Pattern</Label>
            {
                isDefaultPattern ? <Label>*</Label> : <Input css={{}} type="textbox" value={value.pattern} onChange={(e) => changeText('pattern', e.currentTarget.value)} />
            }
            <Label>Delimiter</Label>
            <Input css={{}} type="textbox" value={value.delimiter} onChange={(e) => changeText('delimiter', e.currentTarget.value)} />
            <Label>Row Name</Label>
            <Input css={{}} type="textbox" value={value.row_name} onChange={(e) => changeText('row_name', e.currentTarget.value)} />
            <Label>Col Name</Label>
            <Input css={{}} type="textbox" value={value.col_name} onChange={(e) => changeText('col_name', e.currentTarget.value)} />
            <h3>Stats</h3>
            <Label>Stat</Label>
            <Input css={{}} type="textbox" value={value.valueName} onChange={(e) => changeText('valueName', e.currentTarget.value)} />
            <Label>Format</Label>
            <Input css={{}} type="textbox" value={value.format} onChange={(e) => changeText('format', e.currentTarget.value)} />
            <Label>Decimals</Label>
            <Input css={{}} type="textbox" value={value.decimals} onChange={(e) => changeText('decimals', e.currentTarget.value)} />
            <h3>Display</h3>
            <Label>Value Template</Label>
            <Input css={{}} type="textbox" value={value.displayTemplate} onChange={(e) => changeText('displayTemplate', e.currentTarget.value)} />
            <Label>BG Color</Label>
            <Input css={{}} type="textbox" value={value.defaultBGColor} onChange={(e) => changeText('defaultBGColor', e.currentTarget.value)} />
            <Label>Text Color</Label>
            <Input css={{}} type="textbox" value={value.defaultTextColor} onChange={(e) => changeText('defaultTextColor', e.currentTarget.value)} />
        </Modal>
    </>
}