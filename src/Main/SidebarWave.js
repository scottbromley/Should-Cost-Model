const SideBarWaveComponent = () => {
  return (
    <svg
    //   width="114"
    //   height="145"
    //   viewBox="0 0 114 145"
    style={{width: "140px", height: "140px", zIndex: "50"}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_141_396)">
        <path
          d="M108 69.5C108 103 2.78991 104.5 2.78989 139C2.79003 104.75 2.7898 91.6872 2.7898 59.4191C2.7898 27.1511 2.78978 19.625 2.78992 2.5C2.78979 31.5 108 29 108 69.5Z"
          fill="#333F48"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_141_396"
          x="0.789795"
          y="0.5"
          width="113.21"
          height="144.5"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_141_396"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_141_396"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SideBarWaveComponent;