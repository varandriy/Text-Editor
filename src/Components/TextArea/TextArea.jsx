import React, { useState, useEffect } from 'react';
import { Line } from './Line'
import { defaultCellStyle } from '../../configs'

function TextArea() {
    const [lines, setLines] = useState([[]])
    const [cursor, setCursor] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const onEnterDown = () => {
            // 1 get copy of current line from cursor to end
            // 2 remove range from cursor to end
            // 3 paste the copy to new line
            const currentLine = lines[cursor.y];
            const cellsAfterCursor = currentLine.slice(cursor.x);

            const linesCopy = lines.map((line, i) => {
                if (i !== cursor.y) {
                    return line;
                }

                return line.slice(0, cursor.x);
            })

            const cursorY = cursor.y + 1
            linesCopy.splice(cursorY, 0, cellsAfterCursor)
            setLines(linesCopy)
            setCursor({ ...cursor, x: 0, y: cursorY })
        };

        const onBackspaceDown = () => {
            // 1 if cursor x == 0 delete current row, else delete cell before cursor
            // 2 update cursor position

            if (cursor.x === 0) {
                if (cursor.y === 0) return;

                const linesCopy = [...lines];
                linesCopy.splice(cursor.y, 1);

                const cursorY = cursor.y - 1;
                const prevLine = lines[cursorY];

                setCursor({ ...cursor, x: prevLine.length, y: cursorY });
                setLines(linesCopy);
            } else {
                const cursorX = cursor.x - 1;
                setCursor({ ...cursor, x: cursorX });

                setLines(
                    lines.map((line, i) => {
                        if (i !== cursor.y) {
                            return line;
                        }

                        const lineCopy = [...line];
                        lineCopy.splice(cursorX, 1);

                        return lineCopy;
                    })
                )
            }
        };

        const onRegularKeyDown = (key) => {
            const symbol = key === ' ' ? <span>&nbsp;</span> : key;
            const cell = { char: symbol, style: defaultCellStyle };
            const newLines = lines.map((line, i) => {
                if (i !== cursor.y) {
                    return line;
                }

                const lineCopy = [...line];
                lineCopy.splice(cursor.x, 0, cell)

                return lineCopy
            });

            const currentLine = newLines[cursor.y];
            const cursorX = Math.min(currentLine.length, cursor.x + 1)

            setCursor({ ...cursor, x: cursorX })
            setLines(newLines)
        };

        const onKeyDown = (e) => {
            if (e.key === 'Enter') {
                onEnterDown();
            } else if (e.key === 'Backspace') {
                onBackspaceDown();
            } else if (e.key.length === 1) {
                onRegularKeyDown(e.key);
            }
        }

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    })

    return lines.map((line, i) => <Line key={i} line={line} cursor={cursor} row={i} />)
}

export default TextArea
