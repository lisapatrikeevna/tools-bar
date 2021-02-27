import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log("EditableSpan called");
    let [editMode, setEditMode] = useState(false);
    let [item, setItem] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setItem(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(item);
    }
    const changeItem = (e: ChangeEvent<HTMLInputElement>) => {
        setItem(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={item} onChange={changeItem} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
