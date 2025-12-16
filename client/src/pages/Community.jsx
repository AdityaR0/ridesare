// src/pages/Community.jsx
import { useState } from "react";

export default function Community() {
  const currentUserRole = "Passenger"; // DEMO

  const members = [
    { name: "Aditya Raj", role: "Driver" },
    { name: "Amit Das", role: "Driver" },
    { name: "Rohit Sharma", role: "Driver" },
    { name: "Sourav Sen", role: "Driver" },
    { name: "Ankit Verma", role: "Driver" },
    { name: "Rahul Kumar", role: "Passenger" },
    { name: "Sneha Singh", role: "Passenger" },
    { name: "Priya Das", role: "Passenger" },
  ];

  const [memberSearch, setMemberSearch] = useState("");

  const [posts, setPosts] = useState([
    {
      name: "Rahul Kumar",
      role: "Passenger",
      message: "Anyone traveling from Salt Lake to New Town around 9 AM?",
      time: "2 hours ago",
      comments: [{ by: "Amit Das", text: "Yes, I can take you." }],
    },
    {
      name: "Amit Das",
      role: "Driver",
      message: "I offer rides daily from Howrah to Sector V.",
      time: "5 hours ago",
      comments: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const addComment = (index) => {
    if (!newComment.trim()) return;
    const updated = [...posts];
    updated[index].comments.push({ by: "You", text: newComment });
    setPosts(updated);
    setNewComment("");
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Salt Lake Local Community
        </h1>

        {/* MAIN LAYOUT */}
        <div className="grid md:grid-cols-4 gap-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-3">

            {/* STATS */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl">Total Members: 8</div>
              <div className="bg-white p-4 rounded-xl">Drivers: 5</div>
              <div className="bg-white p-4 rounded-xl">Passengers: 3</div>
            </div>

            {/* SHARE */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <textarea
                rows="3"
                placeholder="Share something with community..."
                className="w-full border rounded-lg p-2 text-sm"
              />
              <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">
                Post
              </button>
            </div>

            {/* POSTS */}
            <div className="bg-white rounded-xl p-5">
              <h2 className="font-semibold mb-4">💬 Community Posts</h2>

              {posts.map((p, i) => (
                <div key={i} className="border rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium">
                    {p.name} ({p.role})
                  </p>
                  <p className="text-sm text-slate-600">{p.message}</p>
                  <p className="text-xs text-slate-400 mb-3">{p.time}</p>

                  {/* COMMENTS */}
                  <div className="ml-3 space-y-2">
                    {p.comments.map((c, ci) => (
                      <p key={ci} className="text-xs text-slate-600">
                        <span className="font-medium">{c.by}:</span> {c.text}
                      </p>
                    ))}
                  </div>

                  {/* ADD COMMENT */}
                  <div className="mt-3 flex gap-2">
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Comment..."
                      className="flex-1 border rounded-lg px-2 py-1 text-xs"
                    />
                    <button
                      onClick={() => addComment(i)}
                      className="px-3 py-1 bg-slate-800 text-white rounded text-xs"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE – MEMBERS (FIXED + SCROLL) */}
          <div className="bg-white rounded-xl p-5 h-[520px] sticky top-24">
            <h2 className="font-semibold mb-3">👥 Members</h2>

            {/* SEARCH */}
            <input
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Search member..."
              className="w-full mb-3 border rounded-lg px-2 py-1 text-sm"
            />

            {/* SCROLL AREA */}
            <div className="space-y-3 overflow-y-auto h-[420px] pr-1">
              {filteredMembers.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-slate-500">{m.role}</p>
                  </div>

                  {currentUserRole === "Passenger" && m.role === "Driver" && (
                    <button
                      onClick={() =>
                        alert("Future: Redirect to booking page")
                      }
                      className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full"
                    >
                      Book Ride
                    </button>
                  )}

                  {currentUserRole === "Driver" && m.role === "Passenger" && (
                    <button
                      onClick={() =>
                        alert("Future: Offer ride flow")
                      }
                      className="text-xs px-3 py-1 bg-emerald-600 text-white rounded-full"
                    >
                      Offer Ride
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
