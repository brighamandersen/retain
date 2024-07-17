function NoNotesEmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '80px'
      }}
    >
      <svg
        viewBox='0 0 24 24'
        style={{
          color: 'rgb(32, 33, 36)',
          height: 120,
          width: 120,
          opacity: 0.1,
          margin: 20
        }}
      >
        <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z' />
      </svg>
      <div
        style={{
          color: 'rgb(95, 99, 104)',
          fontFamily: 'Outfit',
          fontSize: '22px',
          fontWeight: 400,
          lineHeight: '28px',
          display: 'flex'
        }}
      >
        Notes you add appear here
      </div>
    </div>
  );
}

export default NoNotesEmptyState;
