function LoadingDots({
  size = "3",
  color
}: {
  size?: string;
  color?: string;
}) {
  const circleSize = Number(size);
  const gap = circleSize;
  // Total width is now: (3 circles × diameter) + (2 gaps between circles)
  const totalWidth = (circleSize * 2 * 3) + (gap * 2);
  const totalHeight = Math.max(24, circleSize * 4);
  
  // Calculate positions for perfectly centered circles
  const firstCircle = circleSize; // Left edge + radius
  const secondCircle = firstCircle + (circleSize * 2) + gap;
  const thirdCircle = secondCircle + (circleSize * 2) + gap;

  return (
    <svg
      width={totalWidth}
      height={totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className={color}
    >
      <circle cx={firstCircle} cy={totalHeight/2} r={size} fill="currentColor">
        <animate
          id="spinner_qFRN"
          begin="0;spinner_OcgL.end+0.25s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values={`${totalHeight/2};${totalHeight/4};${totalHeight/2}`}
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
      <circle cx={secondCircle} cy={totalHeight/2} r={size} fill="currentColor">
        <animate
          begin="spinner_qFRN.begin+0.1s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values={`${totalHeight/2};${totalHeight/4};${totalHeight/2}`}
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
      <circle cx={thirdCircle} cy={totalHeight/2} r={size} fill="currentColor">
        <animate
          id="spinner_OcgL"
          begin="spinner_qFRN.begin+0.2s"
          attributeName="cy"
          calcMode="spline"
          dur="0.6s"
          values={`${totalHeight/2};${totalHeight/4};${totalHeight/2}`}
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
        />
      </circle>
    </svg>
  );
}

export { LoadingDots };
