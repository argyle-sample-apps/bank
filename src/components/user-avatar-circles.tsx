type UserAvatarCirclesProps = {
  href: string;
  employerImages: string[];
};

export function UserAvatarCircles({
  href,
  employerImages,
}: UserAvatarCirclesProps) {
  const employers = [
    { id: "employer0", cx: 42, cy: 237 },
    { id: "employer1", cx: 251, cy: 210 },
    { id: "employer2", cx: 150, cy: 85 },
  ];

  return (
    <svg
      width="271"
      height="351"
      viewBox="0 0 271 351"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <clipPath id="avatar">
          <circle cx="42" cy="122" r="25" />
        </clipPath>
      </g>
      {employers.map((employer) => (
        <g key={employer.id}>
          <clipPath id={employer.id}>
            <circle cx={employer.cx} cy={employer.cy} r="12" />
          </clipPath>
        </g>
      ))}
      <circle
        cx="42"
        cy="122"
        r="228.25"
        stroke="url(#paint0_linear_221_271)"
        strokeWidth="1.5"
      />
      <circle
        cx="42"
        cy="122"
        r="114.75"
        stroke="url(#paint1_linear_221_271)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_221_271"
          x1="282.613"
          y1="-107"
          x2="-176.535"
          y2="219.07"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.09375" stopColor="#E3F5F9" />
          <stop offset="0.588542" stopColor="#FED88A" />
          <stop offset="1" stopColor="#C2C1F2" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_221_271"
          x1="163.357"
          y1="6.5"
          x2="-68.2217"
          y2="170.959"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.09375" stopColor="#E3F5F9" />
          <stop offset="0.588542" stopColor="#FED88A" />
          <stop offset="1" stopColor="#C2C1F2" />
        </linearGradient>
      </defs>
      <image
        x="16"
        y="96"
        width="52px"
        height="52px"
        href={href}
        clipPath="url(#avatar)"
      />
      {employerImages.map((employer, index) => (
        <image
          key={employer}
          x={employers[index]?.cx - 12 || 0}
          y={employers[index]?.cy - 12 || 0}
          width="24px"
          height="24px"
          href={employer}
          clipPath={`url(#employer${index})`}
        />
      ))}
    </svg>
  );
}
