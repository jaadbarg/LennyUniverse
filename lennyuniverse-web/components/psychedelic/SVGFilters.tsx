const SVGFilters = () => {
  return (
    <svg id="svg-filters" aria-hidden="true">
      <defs>
        <filter id="distortion-0">
          <feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="1" result="turbulence" seed="0" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        <filter id="distortion-1">
          <feTurbulence type="turbulence" baseFrequency="0.02 0.02" numOctaves="2" result="turbulence" seed="1" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        <filter id="distortion-2">
          <feTurbulence type="turbulence" baseFrequency="0.015 0.015" numOctaves="3" result="turbulence" seed="2" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        <filter id="distortion-3">
          <feTurbulence type="turbulence" baseFrequency="0.01 0.01" numOctaves="2" result="turbulence" seed="3" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        <filter id="glow-pink">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feFlood floodColor="#FF00FF" floodOpacity="0.5" result="pinkFlood" />
          <feComposite in="pinkFlood" in2="coloredBlur" operator="in" result="pinkBlur" />
          <feMerge>
            <feMergeNode in="pinkBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="glow-purple">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feFlood floodColor="#9D00FF" floodOpacity="0.5" result="purpleFlood" />
          <feComposite in="purpleFlood" in2="coloredBlur" operator="in" result="purpleBlur" />
          <feMerge>
            <feMergeNode in="purpleBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="glow-teal">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feFlood floodColor="#00FFFF" floodOpacity="0.5" result="tealFlood" />
          <feComposite in="tealFlood" in2="coloredBlur" operator="in" result="tealBlur" />
          <feMerge>
            <feMergeNode in="tealBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        <filter id="liquid">
          <feTurbulence type="turbulence" baseFrequency="0.015 0.01" numOctaves="3" seed="1" result="turbulence" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="15" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feBlend mode="overlay" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  );
};

export default SVGFilters;