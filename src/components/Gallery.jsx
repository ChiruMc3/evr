function Gallery() {
  const images = [
    'https://via.placeholder.com/300x200?text=Photo+1',
    'https://via.placeholder.com/300x200?text=Photo+2',
    'https://via.placeholder.com/300x200?text=Photo+3',
    'https://via.placeholder.com/300x200?text=Photo+4',
    'https://via.placeholder.com/300x200?text=Photo+5',
    'https://via.placeholder.com/300x200?text=Photo+6',
  ];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Gallery</h2>
      <div style={styles.grid}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Gallery ${i + 1}`} style={styles.img} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: { padding: '3rem 2rem', textAlign: 'center' },
  heading: { marginBottom: '1.5rem', color: '#f0c040' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  img: { width: '100%', borderRadius: '8px' },
};

export default Gallery;
