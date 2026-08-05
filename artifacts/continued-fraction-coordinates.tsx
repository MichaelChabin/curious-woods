import React, { useState } from 'react';

const CoordinateContinuedFraction = () => {
  const [targetPoint, setTargetPoint] = useState({ x: 8, y: 5 });
  const [history, setHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [convergents, setConvergents] = useState([]);
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [zoomRegion, setZoomRegion] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [selectStart, setSelectStart] = useState(null);
  const [selectEnd, setSelectEnd] = useState(null);

  const gridSize = 12;
  const cellSize = 40;
  const padding = 50;

  const reset = () => {
    setHistory([]);
    setIsComplete(false);
    setConvergents([]);
  };

  const handleGridClick = (e) => {
    if (selecting) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - padding;
    const y = e.clientY - rect.top - padding;
    
    let gridX, gridY;
    const effectiveZoom = zoomRegion || { minX: 0, maxX: gridSize, minY: 0, maxY: gridSize };
    const zoomWidth = effectiveZoom.maxX - effectiveZoom.minX;
    const zoomHeight = effectiveZoom.maxY - effectiveZoom.minY;
    
    if (allowDecimals) {
      gridX = effectiveZoom.minX + (x / (gridSize * cellSize)) * zoomWidth;
      gridY = effectiveZoom.minY + ((gridSize * cellSize - y) / (gridSize * cellSize)) * zoomHeight;
      gridX = Math.max(0.1, Math.min(gridSize, Math.round(gridX * 10) / 10));
      gridY = Math.max(0.1, Math.min(gridSize, Math.round(gridY * 10) / 10));
    } else {
      gridX = effectiveZoom.minX + (x / (gridSize * cellSize)) * zoomWidth;
      gridY = effectiveZoom.minY + ((gridSize * cellSize - y) / (gridSize * cellSize)) * zoomHeight;
      gridX = Math.max(1, Math.min(gridSize, Math.round(gridX)));
      gridY = Math.max(1, Math.min(gridSize, Math.round(gridY)));
    }
    
    setTargetPoint({ x: gridX, y: gridY });
    reset();
  };

  const handleMouseDown = (e) => {
    if (e.shiftKey) {
      setSelecting(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - padding;
      const y = e.clientY - rect.top - padding;
      setSelectStart({ x, y });
      setSelectEnd({ x, y });
    }
  };

  const handleMouseMove = (e) => {
    if (selecting && selectStart) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - padding;
      const y = e.clientY - rect.top - padding;
      setSelectEnd({ x, y });
    }
  };

  const handleMouseUp = () => {
    if (selecting && selectStart && selectEnd) {
      const effectiveZoom = zoomRegion || { minX: 0, maxX: gridSize, minY: 0, maxY: gridSize };
      const zoomWidth = effectiveZoom.maxX - effectiveZoom.minX;
      const zoomHeight = effectiveZoom.maxY - effectiveZoom.minY;
      
      const minX = Math.max(0, Math.min(selectStart.x, selectEnd.x));
      const maxX = Math.min(gridSize * cellSize, Math.max(selectStart.x, selectEnd.x));
      const minY = Math.max(0, Math.min(selectStart.y, selectEnd.y));
      const maxY = Math.min(gridSize * cellSize, Math.max(selectStart.y, selectEnd.y));
      
      const newMinX = effectiveZoom.minX + (minX / (gridSize * cellSize)) * zoomWidth;
      const newMaxX = effectiveZoom.minX + (maxX / (gridSize * cellSize)) * zoomWidth;
      const newMinY = effectiveZoom.maxY - (maxY / (gridSize * cellSize)) * zoomHeight;
      const newMaxY = effectiveZoom.maxY - (minY / (gridSize * cellSize)) * zoomHeight;
      
      if (Math.abs(maxX - minX) > 20 && Math.abs(maxY - minY) > 20) {
        setZoomRegion({ minX: newMinX, maxX: newMaxX, minY: newMinY, maxY: newMaxY });
      }
    }
    setSelecting(false);
    setSelectStart(null);
    setSelectEnd(null);
  };

  const calculateConvergent = (terms) => {
    if (terms.length === 0) return { num: 0, den: 1 };
    if (terms.length === 1) return { num: terms[0], den: 1 };
    
    let h_prev2 = 1, h_prev1 = terms[0];
    let k_prev2 = 0, k_prev1 = 1;
    
    for (let i = 1; i < terms.length; i++) {
      const h = terms[i] * h_prev1 + h_prev2;
      const k = terms[i] * k_prev1 + k_prev2;
      
      h_prev2 = h_prev1;
      h_prev1 = h;
      k_prev2 = k_prev1;
      k_prev1 = k;
    }
    
    return { num: h_prev1, den: k_prev1 };
  };

  const nextStep = () => {
    if (isComplete) return;
    
    let w, h;
    if (history.length === 0) {
      w = targetPoint.x;
      h = targetPoint.y;
    } else {
      const last = history[history.length - 1];
      w = last.nextW;
      h = last.nextH;
    }
    
    if (w < h) [w, h] = [h, w];
    
    if (h < 0.01) {
      setIsComplete(true);
      return;
    }
    
    const numSquares = Math.floor(w / h);
    const remainder = w - (numSquares * h);
    
    const step = {
      w,
      h,
      numSquares,
      remainder,
      nextW: h,
      nextH: remainder,
      squareSide: h,
      area: h * h
    };
    
    const newHistory = [...history, step];
    setHistory(newHistory);
    
    const terms = newHistory.map(s => s.numSquares);
    const conv = calculateConvergent(terms);
    setConvergents([...convergents, conv]);
    
    if (remainder < 0.01) {
      setIsComplete(true);
    }
  };

  const getSquarePositions = () => {
    const squares = [];
    let offsetX = 0;
    let offsetY = 0;
    let rotation = 0;
    
    history.forEach((step, idx) => {
      const colors = ['#93c5fd', '#fde047', '#f9a8d4', '#86efac', '#a5b4fc'];
      const color = colors[idx % colors.length];
      
      for (let i = 0; i < step.numSquares; i++) {
        if (rotation === 0) {
          squares.push({
            x: offsetX,
            y: offsetY,
            size: step.squareSide,
            color,
            label: `${step.squareSide.toFixed(1)}²`,
            area: step.area,
            stepNum: idx + 1
          });
          offsetX += step.squareSide;
        } else {
          squares.push({
            x: offsetX,
            y: offsetY,
            size: step.squareSide,
            color,
            label: `${step.squareSide.toFixed(1)}²`,
            area: step.area,
            stepNum: idx + 1
          });
          offsetY += step.squareSide;
        }
      }
      
      if (step.remainder > 0.01) {
        rotation = 1 - rotation;
      }
    });
    
    return squares;
  };

  const squares = getSquarePositions();
  const cfTerms = history.map(s => s.numSquares);
  
  const effectiveZoom = zoomRegion || { minX: 0, maxX: gridSize, minY: 0, maxY: gridSize };

  const formatDecimal = (value) => {
    const str = value.toFixed(4);
    // Check if it's repeating (like .3333 or .6666) but not terminating (like .0000)
    const decimal = str.split('.')[1];
    if (decimal && decimal !== '0000') {
      const firstDigit = decimal[0];
      if (decimal === firstDigit.repeat(4) || 
          (decimal.slice(0,2) === decimal.slice(2,4) && decimal[0] !== '0')) {
        return value.toFixed(3) + '...';
      }
    }
    return str;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-7xl w-full">
        <div className="mb-3 p-3 bg-blue-50 rounded text-xs text-gray-700">
          <strong>Click anywhere on the grid</strong> to create a rectangle from (0,0) to your point.
          Click "Next" to square the smaller side. <strong>Shift+drag</strong> to zoom into a region.
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <div className="flex flex-col items-center" style={{width: '240px'}}>
            <div className="flex flex-col gap-2 w-48">
              <button
                onClick={nextStep}
                disabled={isComplete || history.length >= 10}
                className="px-2 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
              
              <button
                onClick={reset}
                className="px-2 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Reset
              </button>
              
              <button
                onClick={() => {
                  setAllowDecimals(!allowDecimals);
                  reset();
                }}
                className={`px-2 py-2 rounded text-sm ${allowDecimals ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'} text-white`}
              >
                Decimals
              </button>
              
              {zoomRegion && (
                <button
                  onClick={() => setZoomRegion(null)}
                  className="px-2 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                >
                  Zoom Out
                </button>
              )}
              
              <div className="grid grid-cols-2 gap-1 mt-2">
                {squares.length > 0 && squares.reduce((unique, sq) => {
                  if (!unique.find(u => u.stepNum === sq.stepNum)) {
                    unique.push(sq);
                  }
                  return unique;
                }, []).map((sq, idx) => (
                  <div 
                    key={idx} 
                    className="text-xs p-1.5 rounded font-semibold text-center"
                    style={{ backgroundColor: sq.color, color: '#1f2937' }}
                  >
                    {sq.label} = {sq.area.toFixed(1)}
                  </div>
                ))}
              </div>
            </div>

            {cfTerms.length > 0 && (
              <div className="bg-gray-50 p-4 rounded border-2 border-gray-300 mt-4 w-full overflow-x-auto">
                <div className="flex items-start gap-4">
                  <div 
                    className="inline-block"
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        const buildContinuedFraction = (terms, depth = 0) => {
                          if (depth >= terms.length) {
                            return !isComplete ? '<span style="font-size: 1.2em; color: #9ca3af;">⋱</span>' : '';
                          }
                          
                          const term = terms[depth];
                          const fontSize = Math.max(0.75, 1 - depth * 0.12);
                          const padding = Math.max(4, 12 - depth * 2);
                          
                          if (depth === 0) {
                            return `<span style="font-size: ${fontSize}em; font-weight: bold;">${term} + </span>${buildContinuedFraction(terms, depth + 1)}`;
                          }
                          
                          const innerContent = buildContinuedFraction(terms, depth + 1);
                          
                          return `<span style="display: inline-block; vertical-align: middle; font-size: ${fontSize}em;">
                            <span style="display: block; text-align: center; font-weight: bold;">1</span>
                            <span style="display: block; border-top: 2px solid black; margin: 2px 0;"></span>
                            <span style="display: block; text-align: center; padding: 0 ${padding}px;">
                              <span style="font-weight: bold;">${term}</span>${depth < terms.length - 1 ? ' <span style="font-weight: bold;">+</span> ' : ''}${innerContent}
                            </span>
                          </span>`;
                        };
                        
                        return buildContinuedFraction(cfTerms);
                      })()
                    }}
                  />
                  
                  {convergents.length > 0 && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-semibold text-gray-700">
                        = {formatDecimal(convergents[convergents.length - 1].num / convergents[convergents.length - 1].den)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <svg
              width={gridSize * cellSize + padding * 2}
              height={gridSize * cellSize + padding * 2}
              className="border-2 border-gray-300 rounded bg-white cursor-crosshair"
              onClick={handleGridClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {Array.from({ length: gridSize + 1 }).map((_, i) => (
                <g key={i}>
                  <line
                    x1={padding}
                    y1={padding + i * cellSize}
                    x2={padding + gridSize * cellSize}
                    y2={padding + i * cellSize}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1={padding + i * cellSize}
                    y1={padding}
                    x2={padding + i * cellSize}
                    y2={padding + gridSize * cellSize}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                </g>
              ))}

              <line
                x1={padding}
                y1={padding + gridSize * cellSize}
                x2={padding + gridSize * cellSize}
                y2={padding + gridSize * cellSize}
                stroke="#374151"
                strokeWidth="2"
              />
              <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={padding + gridSize * cellSize}
                stroke="#374151"
                strokeWidth="2"
              />

              <text x={padding + gridSize * cellSize + 10} y={padding + gridSize * cellSize + 5} fontSize="12" fill="#374151">x</text>
              <text x={padding - 10} y={padding - 10} fontSize="12" fill="#374151">y</text>

              {Array.from({ length: Math.ceil(effectiveZoom.maxX - effectiveZoom.minX) + 1 }).map((_, i) => {
                const val = Math.floor(effectiveZoom.minX) + i;
                if (val < 0 || val > gridSize) return null;
                const screenX = padding + ((val - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize;
                return (
                  <text
                    key={`x-${i}`}
                    x={screenX}
                    y={padding + gridSize * cellSize + 20}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6b7280"
                  >
                    {val}
                  </text>
                );
              })}

              {Array.from({ length: Math.ceil(effectiveZoom.maxY - effectiveZoom.minY) + 1 }).map((_, i) => {
                const val = Math.floor(effectiveZoom.minY) + i;
                if (val < 0 || val > gridSize) return null;
                const screenY = padding + gridSize * cellSize - ((val - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize;
                return (
                  <text
                    key={`y-${i}`}
                    x={padding - 10}
                    y={screenY + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#6b7280"
                  >
                    {val}
                  </text>
                );
              })}

              <rect
                x={padding}
                y={padding + gridSize * cellSize - ((targetPoint.y - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                width={((targetPoint.x - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize}
                height={((targetPoint.y - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                fill="#d1d5db"
                opacity="0.3"
                stroke="none"
              />

              <line
                x1={padding}
                y1={padding + gridSize * cellSize}
                x2={padding + ((targetPoint.x - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize}
                y2={padding + gridSize * cellSize - ((targetPoint.y - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="3,3"
              />

              {squares.map((sq, idx) => (
                <rect
                  key={idx}
                  x={padding + ((sq.x - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize}
                  y={padding + gridSize * cellSize - ((sq.y + sq.size - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                  width={((sq.size) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize}
                  height={((sq.size) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                  fill={sq.color}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.7"
                />
              ))}

              {convergents.filter(conv => 
                conv.num <= targetPoint.x && conv.den <= targetPoint.y &&
                conv.num >= effectiveZoom.minX && conv.num <= effectiveZoom.maxX &&
                conv.den >= effectiveZoom.minY && conv.den <= effectiveZoom.maxY
              ).map((conv, idx) => (
                <g key={idx}>
                  <circle
                    cx={padding + ((conv.num - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize}
                    cy={padding + gridSize * cellSize - ((conv.den - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                    r="5"
                    fill="#dc2626"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + ((conv.num - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize + 10}
                    y={padding + gridSize * cellSize - ((conv.den - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize - 10}
                    fontSize="10"
                    fill="#dc2626"
                    fontWeight="bold"
                  >
                    {conv.num}/{conv.den}
                  </text>
                </g>
              ))}

              <circle
                cx={padding + ((targetPoint.x - effectiveZoom.minX) / (effectiveZoom.maxX - effectiveZoom.minX)) * gridSize * cellSize}
                cy={padding + gridSize * cellSize - ((targetPoint.y - effectiveZoom.minY) / (effectiveZoom.maxY - effectiveZoom.minY)) * gridSize * cellSize}
                r="6"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
              />

              {selecting && selectStart && selectEnd && (
                <rect
                  x={padding + Math.min(selectStart.x, selectEnd.x)}
                  y={padding + Math.min(selectStart.y, selectEnd.y)}
                  width={Math.abs(selectEnd.x - selectStart.x)}
                  height={Math.abs(selectEnd.y - selectStart.y)}
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )}
            </svg>
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
            <div className="mb-2 text-sm text-gray-700">
              <div><strong>Target:</strong> ({targetPoint.x}, {targetPoint.y}) = {formatDecimal(targetPoint.x / targetPoint.y)}</div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2 max-h-64 overflow-y-auto">
                <h4 className="font-semibold text-sm">Subdivision Steps:</h4>
                {history.map((step, idx) => {
                  const totalWidth = step.numSquares * step.squareSide;
                  return (
                    <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                      <div className="font-semibold">Step {idx + 1}:</div>
                      <div className="text-gray-700">
                        {step.numSquares} square{step.numSquares !== 1 ? 's' : ''} of size <span className="text-blue-600 font-bold">{step.squareSide.toFixed(1)}×{step.squareSide.toFixed(1)}</span>
                      </div>
                      <div className="text-gray-600 text-xs">
                        {step.w.toFixed(1)} − {totalWidth.toFixed(1)} leaves width of {step.remainder.toFixed(1)}
                      </div>
                    </div>
                  );
                })}
                
                {isComplete && (
                  <div className="text-green-600 font-semibold mt-2">
                    ✓ Complete!
                  </div>
                )}
              </div>
              
              {convergents.length > 0 && (
                <div className="flex-1 space-y-2 max-h-64 overflow-y-auto">
                  <h4 className="font-semibold text-sm">Convergents:</h4>
                  {convergents.map((conv, idx) => {
                    const isExact = isComplete && idx === convergents.length - 1;
                    const label = isExact ? 'Exact' : `${['1st', '2nd', '3rd'][idx] || `${idx + 1}th`} approximation`;
                    return (
                      <div key={idx} className="text-sm bg-red-50 p-2 rounded">
                        <div className="font-mono text-red-600 font-semibold">
                          {conv.num}/{conv.den} = {formatDecimal(conv.num / conv.den)}
                        </div>
                        <div className="text-xs text-gray-600">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinateContinuedFraction;