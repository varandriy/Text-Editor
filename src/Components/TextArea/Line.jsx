import React, { useState } from 'react';
import { Cell } from './Cell'

export const Line = (props) => {
    const { line, cursor, row } = props;

    return (
        <div style={{ minHeight: 14 }}>
            {
                line.map((cell, j) => {
                    return (
                        <React.Fragment key={j}>
                            <Cell key={j} cell={cell} />
                            {
                                cursor.x - 1 === j && cursor.y === row && (
                                    '|'
                                )
                            }
                        </ React.Fragment>
                    )
                })
            }
            {
                cursor.y === row && line.length === 0 && '|'
            }
        </div>
    );
}
