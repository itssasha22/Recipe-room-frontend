const RatingStars = ({ rating = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= rating ? '#fdba74' : '#d1d5db' }}>
        ★
      </span>
    );
  }
  return <div style={{ fontSize: '1.2rem' }}>{stars}</div>;
};

export default RatingStars;