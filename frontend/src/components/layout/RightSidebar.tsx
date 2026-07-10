export default function RightSidebar() {
  const users = [
    "Ananya",
    "Rohit",
    "Priya",
    "Aman",
  ];

  return (
    <aside className="space-y-6">

      <div className="bg-white rounded-2xl shadow-sm p-5">

        <h2 className="font-bold text-lg mb-4">
          Suggested Students
        </h2>

        {users.map((user) => (
          <div
            key={user}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex gap-3 items-center">

              <img
                src={`https://ui-avatars.com/api/?name=${user}`}
                className="w-10 h-10 rounded-full"
                alt={user}
              />

              <span>{user}</span>

            </div>

            <button className="text-blue-600 font-medium">
              Follow
            </button>

          </div>
        ))}

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">

        <h2 className="font-bold mb-3">
          Trending
        </h2>

        <p>#Placements</p>
        <p>#Hackathon</p>
        <p>#MNNIT</p>
        <p>#GATE2027</p>

      </div>

    </aside>
  );
}