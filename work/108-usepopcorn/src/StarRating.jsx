const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const starStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StarRating({ maxRating = 5 }) {
  return (
    <div style={containerStyle}>
      <div style={starStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>Star{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>{maxRating}</p>
    </div>
  );
}
