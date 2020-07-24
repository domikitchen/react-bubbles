import React, { useState } from "react";

import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor ] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const onHeckingChange = evt => {
    evt.preventDefault();

    setNewColor({
      ...newColor,
      [evt.target.name]: evt.target.value,
      code: {
        ...newColor.code,
        [evt.target.name]: evt.target.value,
      }
    })
  }

  const newColorSubmit = evt => {
    evt.preventDefault();
    
    axiosWithAuth().post(`/api/colors`, newColor)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        setEditing(false);
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      })
  };

  const deleteColor = color => {

    console.log(color);
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then(response => {
        setEditing(false);
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit = {newColorSubmit}>
        <p>New Color</p>
        <label>
          Color: 
          <input
            type = "text"
            name = "color"
            value = {newColor.color}
            onChange = {onHeckingChange}
            placeholder = "white"
          />
        </label>
        <label>
          Hex Code:
          <input
            type = "text"
            name = "hex"
            value = {newColor.code.hex}
            onChange = {onHeckingChange}
            placeholder = "#ffffff"
          />
        </label>
        <div className = "button-row">
          <button onClick = {newColorSubmit}>+</button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
