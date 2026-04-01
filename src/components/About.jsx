function About() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>About Us</h2>
      <p style={styles.text}>
        EVR Photography is a passionate team of photographers dedicated to
        capturing the beauty of life's most precious moments. With years of
        experience in wedding, portrait, and event photography, we bring
        creativity and professionalism to every shoot.
      </p>
    </section>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: { marginBottom: '1rem', color: '#f0c040' },
  text: { lineHeight: 1.8, color: '#ccc' },
};

export default About;
