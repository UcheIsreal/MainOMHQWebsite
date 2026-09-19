function base(children, props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function AdsIcon(props) {
  return base(
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h2l4 4V5L6 9H4a1 1 0 0 0-1 1Z" />
      <path d="M15 8.5c1 .9 1.5 2.1 1.5 3.5s-.5 2.6-1.5 3.5" />
      <path d="M18 5.5c1.9 1.7 3 4 3 6.5s-1.1 4.8-3 6.5" />
    </>,
    props
  );
}

export function SeoIcon(props) {
  return base(
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M15 15l5.5 5.5" />
      <path d="M7.5 10.5 9.5 12l3-4" />
    </>,
    props
  );
}

export function StoreIcon(props) {
  return base(
    <>
      <path d="M4 9V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
      <path d="M3 4h18l1.2 5H1.8L3 4Z" />
      <path d="M9 20v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V20" />
    </>,
    props
  );
}

export function ArrowIcon(props) {
  return base(<path d="M5 12h13M13 6l6 6-6 6" />, props);
}

export function CheckIcon(props) {
  return base(<path d="M4 12.5 9 17.5 20 6.5" />, props);
}
