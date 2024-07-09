export const LoadingSpinner = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ border: "4px solid #f3f3f3", borderTop: "4px solid #3498db", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 2s linear infinite" }}></div>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
