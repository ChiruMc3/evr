function Contact() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Contact Us</h2>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea placeholder="Your Message" rows="5" style={styles.input} />
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </section>
  );
}

const styles = {
  section: { padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
  heading: { marginBottom: '1.5rem', color: '#f0c040' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#f0c040',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Contact;
