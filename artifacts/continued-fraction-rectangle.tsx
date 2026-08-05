import React, { useState } from 'react';
import { RotateCcw, Play } from 'lucide-react';

const ContinuedFractionVisualizer = () => {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(5);
  const [history, setHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const reset = () => {
    setHistory([]);
    setIsComplete(false);
  };

  const nextStep = () => {
    if (isComplete) return;
    
    // Get current rectangle (either initial or from last step)
    let w, h;
    if (history.length === 0) {
      w = Number(width);
      h = Number(height);
    } else {
      const last = history[history.length - 1];
      w = last.nextW;
      h = last.nextH;
    }
    
    // Make sure w >= h (swap if needed)
    if (w < h) {
      [w, h] = [h, w];
    }
    
    // Stop if remainder is too small
    if (h < 0.01) {
      setIsComplete(true);
      return;
    }
    
    // Calculate how many squares fit
    const numSquares = Math.floor(w / h);
    const remainder = w - (numSquares * h);
    
    // Next rectangle will be h × remainder
    const nextW = h;
    const nextH = remainder;
    
    setHistory([...history, {
      w,
      h,
      numSquares,
      remainder,
      nextW,
      nextH
    }]);
    
    if (remainder < 0.01) {
      setIsComplete(true);
    }
  };

  // Build continued fraction terms
  const cfTerms = history.map(step => step.numSquares);

  // Calculate positions for accumulated visualization
  const getAccumulatedLayout = () => {
    const rectangles = [];
    let offsetX = 0;
    let offsetY = 0;
    let currentW = Number(width);
    let currentH = Number(height);
    let rotation = 0; // 0 = horizontal, 1 = vertical
    
    history.forEach((step, idx) => {
      const colors = ['#93c5fd', '#fde047', '#f9a8d4', '#86efac', '#a5b4fc'];
      const color = colors[idx % colors.length];
      
      // Add squares for this step
      for (let i = 0; i < step.numSquares; i++) {
        if (rotation === 0) {
          // Horizontal layout
          rectangles.push({
            x: offsetX,
            y: offsetY,
            width: step.h,
            height: step.h,
            color: color,
            label: `${step.h.toFixed(1)}`,
            isSquare: true,
            stepNum: idx + 1
          });
          offsetX += step.h;
        } else {
          // Vertical layout
          rectangles.push({
            x: offsetX,
            y: offsetY,
            width: step.h,
            height: step.h,
            color: color,
            label: `${step.h.toFixed(1)}`,
            isSquare: true,
            stepNum: idx + 1
          });
          offsetY += step.h;
        }
      }
      
      // Update for next iteration if there's a remainder
      if (step.remainder > 0.01 && idx < history.length - 1) {
        rotation = 1 - rotation; // Flip rotation
        currentW = step.nextW;
        currentH = step.nextH;
      }
    });
    
    // Add the current remainder if not complete
    if (!isComplete && history.length > 0) {
      const lastStep = history[history.length - 1];
      if (lastStep.remainder > 0.01) {
        rectangles.push({
          x: offsetX,
          y: offsetY,
          width: rotation === 0 ? lastStep.remainder : lastStep.nextW,
          height: rotation === 0 ? lastStep.h : lastStep.remainder,
          color: '#fecaca',
          isDashed: true,
          isRemainder: true
        });
      }
    }
    
    return rectangles;
  };

  const rectangles = getAccumulatedLayout();

  // Calculate canvas dimensions
  const scale = 35;
  const maxDim = Math.max(width, height);
  const padding = 20;

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Rectangle Subdivision & Continued Fractions
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>How it works:</strong> Each step removes the largest squares that fit, shown in different colors.
            The red dashed area is what remains. Click "Next Step" to continue subdividing.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Width: {width}</label>
            <input
              type="range"
              min="2"
              max="13"
              step="1"
              value={width}
              onChange={(e) => {
                setWidth(Number(e.target.value));
                reset();
              }}
              className="w-32"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Height: {height}</label>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={height}
              onChange={(e) => {
                setHeight(Number(e.target.value));
                reset();
              }}
              className="w-32"
            />
          </div>

          <div className="flex gap-2 items-end">
            <button
              onClick={nextStep}
              disabled={isComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Play size={16} />
              Next Step
            </button>
            
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Accumulated Subdivision:</h3>
            <svg
              width="100%"
              height="400"
              className="border-2 border-gray-300 rounded bg-white"
              viewBox={`0 0 ${maxDim * scale + padding * 2} ${maxDim * scale + padding * 2}`}
            >
              {/* Show original rectangle outline */}
              {history.length === 0 ? (
                <g>
                  <rect
                    x={padding}
                    y={padding}
                    width={width * scale}
                    height={height * scale}
                    fill="#dbeafe"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <text
                    x={padding + (width * scale) / 2}
                    y={padding + (height * scale) / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#1e40af"
                  >
                    {width} × {height}
                  </text>
                </g>
              ) : (
                <g>
                  {/* Draw original rectangle outline */}
                  <rect
                    x={padding}
                    y={padding}
                    width={width * scale}
                    height={height * scale}
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="3"
                  />
                  
                  {/* Draw all accumulated rectangles */}
                  {rectangles.map((rect, idx) => (
                    <g key={idx}>
                      <rect
                        x={padding + rect.x * scale}
                        y={padding + rect.y * scale}
                        width={rect.width * scale}
                        height={rect.height * scale}
                        fill={rect.color}
                        stroke={rect.isDashed ? "#ef4444" : "#374151"}
                        strokeWidth="2"
                        strokeDasharray={rect.isDashed ? "5,5" : "0"}
                        opacity={rect.isRemainder ? "0.7" : "0.85"}
                      />
                      {rect.isSquare && (
                        <text
                          x={padding + rect.x * scale + (rect.width * scale) / 2}
                          y={padding + rect.y * scale + (rect.height * scale) / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill="#1f2937"
                        >
                          Step {rect.stepNum}
                        </text>
                      )}
                    </g>
                  ))}
                </g>
              )}
            </svg>
            <div className="mt-2 text-xs text-gray-600">
              Each color represents squares removed in one step. Red dashed = remainder.
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex-1">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Continued Fraction</h3>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  Ratio: {width}/{height} ≈ {(width/height).toFixed(4)}
                </div>
                
                {cfTerms.length > 0 && (
                  <>
                    <div className="text-sm text-gray-500 mb-1">Shorthand:</div>
                    <div className="text-base font-mono bg-gray-50 p-2 rounded mb-3">
                      [{cfTerms.join('; ').replace(';', '; ')}
                      {!isComplete && ', ...'}]
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-1">As a fraction:</div>
                    <div className="bg-gray-50 p-3 rounded overflow-x-auto">
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: (() => {
                            // Build LaTeX-style HTML for continued fraction
                            let latex = cfTerms[0].toString();
                            
                            for (let i = 1; i < cfTerms.length; i++) {
                              latex = `${cfTerms[0]} + <span style="display: inline-block; vertical-align: middle;"><span style="display: block; text-align: center; border-bottom: 1px solid black; padding: 0 8px;">1</span><span style="display: block; text-align: center; padding: 2px 8px;">${cfTerms.slice(1, i + 1).reduce((acc, term, idx) => {
                                if (idx === 0) return term.toString();
                                return acc + ` + <span style="display: inline-block; vertical-align: middle;"><span style="display: block; text-align: center; border-bottom: 1px solid black; padding: 0 4px;">1</span><span style="display: block; text-align: center; padding: 2px 4px;">${term}${idx < cfTerms.length - 2 ? ' + ...' : ''}</span></span>`;
                              }, '')}</span></span>`;
                            }
                            
                            if (!isComplete && cfTerms.length > 0) {
                              // Add dots for incomplete
                              const buildFraction = (terms, depth = 0) => {
                                if (depth >= terms.length) {
                                  return '<span style="font-size: 1.2em;">⋱</span>';
                                }
                                
                                const fontSize = Math.max(0.7, 1 - depth * 0.15);
                                const padding = Math.max(2, 8 - depth * 2);
                                
                                if (depth === 0) {
                                  return `<span style="font-size: ${fontSize}em;">${terms[0]} + </span><span style="display: inline-block; vertical-align: middle; font-size: ${fontSize}em;"><span style="display: block; text-align: center; border-bottom: 1px solid black; padding: 0 ${padding}px;">1</span><span style="display: block; text-align: center; padding: 2px ${padding}px;">${buildFraction(terms, depth + 1)}</span></span>`;
                                }
                                
                                if (depth < terms.length) {
                                  return `<span style="font-size: ${fontSize}em;">${terms[depth]} + </span><span style="display: inline-block; vertical-align: middle; font-size: ${fontSize}em;"><span style="display: block; text-align: center; border-bottom: 1px solid black; padding: 0 ${padding}px;">1</span><span style="display: block; text-align: center; padding: 2px ${padding}px;">${buildFraction(terms, depth + 1)}</span></span>`;
                                }
                                
                                return '<span style="font-size: 1.2em;">⋱</span>';
                              };
                              
                              return buildFraction(cfTerms);
                            } else {
                              // Complete fraction
                              const buildFraction = (terms, depth = 0) => {
                                if (depth >= terms.length) return '';
                                
                                const fontSize = Math.max(0.7, 1 - depth * 0.15);
                                const padding = Math.max(2, 8 - depth * 2);
                                
                                if (depth === terms.length - 1) {
                                  return `<span style="font-size: ${fontSize}em;">${terms[depth]}</span>`;
                                }
                                
                                if (depth === 0) {
                                  return `<span style="font-size: ${fontSize}em;">${terms[0]} + </span><span style="display: inline-block; vertical-align: middle; font-size: ${fontSize}em;"><span style="display: block; text-align: center; border-bottom: 1px solid black; padding: 0 ${padding}px;">1</span><span style="display: block; text-align: center; padding: 2px ${padding}px;">${buildFraction(terms, depth + 1)}</span></span>`;
                                }
                                
                                return `<span style="font-size: ${fontSize}em;">${terms[depth]} + </span><span style="display: inline-block; vertical-align: middle; font-size: ${fontSize}em;"><span style="display: block; text-align: center; border-bottom: 1px solid black; padding: 0 ${padding}px;">1</span><span style="display: block; text-align: center; padding: 2px ${padding}px;">${buildFraction(terms, depth + 1)}</span></span>`;
                              };
                              
                              return buildFraction(cfTerms);
                            }
                          })()
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h4 className="font-semibold text-sm">Steps:</h4>
                {history.map((step, idx) => (
                  <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                    <div className="font-semibold">Step {idx + 1}:</div>
                    <div>{step.w.toFixed(1)} ÷ {step.h.toFixed(1)}</div>
                    <div className="text-gray-600">
                      → {step.numSquares} square{step.numSquares !== 1 ? 's' : ''} of size {step.h.toFixed(1)}
                    </div>
                    <div className="text-gray-600">
                      → Remainder: {step.remainder.toFixed(1)}
                    </div>
                  </div>
                ))}
                
                {isComplete && (
                  <div className="text-green-600 font-semibold mt-2">
                    ✓ Complete!
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
              <p className="text-sm text-gray-700">
                <strong>Try these:</strong><br/>
                • 8/5 (Fibonacci: [1; 1, 1, ...])<br/>
                • 13/8 (closer to φ)<br/>
                • 7/3 (simple: [2; 3, ...])<br/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuedFractionVisualizer;