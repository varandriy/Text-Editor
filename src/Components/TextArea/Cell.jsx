import React, { useState } from 'react';

export const Cell = (props) => {
    const { cell } = props;

    return (
        <span style={cell.style}>
            {cell.char}
        </span>
    );
}
 