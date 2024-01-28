export const MainCardSkeleton = () => {
  return (
    <div className="card w-100 m-4" style={styles.card}>
      <div className="shimmer w-100" style={styles.shimmer}></div>
    </div>
  );
};
export const DailyCardSkeleton = () => {
  return (
    <div className="card w-100 m-4" style={styles.cardDaily}>
      <div className="shimmer w-100" style={styles.shimmerDaily}></div>
    </div>
  );
};

const styles = {
  card: {
    borderRadius: "8px",
    height: "300px",
    overflow: "hidden",
    backgroundColor: "rgba(163, 209, 255, 1)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  shimmer: {
    height: "300px",
    background:
      "linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmerAnimation 1s infinite",
  },
  cardDaily: {
    borderRadius: "8px",
    height: "100px",
    overflow: "hidden",
    backgroundColor: "rgba(163, 209, 255, 1)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  shimmerDaily: {
    height: "100px",
    background:
      "linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
    backgroundSize: "200% 100%",
    animation: "shimmerAnimation 1s infinite",
  },
};
