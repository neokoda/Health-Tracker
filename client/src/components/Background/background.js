export default function Background({ children }) {
    return (
      <div className="overflow-scroll flex items-center justify-center h-screen w-screen bg-gradient-to-r from-green-300 via-teal-300 to-green-300">
        {children}
      </div>
    );
  }