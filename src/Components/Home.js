import React, { useState, useEffect } from "react";
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";

function Home() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = db.collection("groups")
      .orderBy("groupName", "asc")
      .onSnapshot((snapshot) => {
        setGroups(
          snapshot.docs.map((group) => ({
            groupName: group.data().groupName,
            id: group.id,
            members: group.data().members || [],
            lastMessage: group.data().lastMessage || { text: "No messages yet", timestamp: new Date() },
          }))
        );
        setIsLoading(false);
      });
    
    return () => unsubscribe();
  }, []);

  const goToGroup = (id) => {
    history.push(`/group/${id}`);
  };

  const filteredGroups = groups.filter(group => 
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate a consistent color based on the group name
  const getGroupColor = (name) => {
    const colors = [
      "bg-gradient-to-br from-purple-500 to-indigo-600",
      "bg-gradient-to-br from-blue-500 to-teal-400",
      "bg-gradient-to-br from-emerald-500 to-teal-400",
      "bg-gradient-to-br from-orange-500 to-amber-400",
      "bg-gradient-to-br from-rose-500 to-pink-500",
      "bg-gradient-to-br from-fuchsia-500 to-purple-600"
    ];
    
    // Simple hash function to get a consistent color for the same name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0wLTE3YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNHptMTcgMTdjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0tMTcgMTdjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0tMTctMTdjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00em0xNy0xN2MwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTR6TTE5IDM0YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNHptMC0xN2MwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTR6bTE3IDE3YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNHptLTE3IDE3YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-center"></div>
        </div>
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-4 text-white">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">Chatter</span>
              </h1>
              <p className="text-xl text-purple-100 max-w-lg">
                Connect with groups, share ideas, and chat in real-time using Firebase's powerful backend.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
                <div className="text-4xl font-bold">{groups.length}</div>
                <div className="text-purple-200">Active Groups</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full bg-gray-800 text-white border-0 rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg 
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="container mx-auto px-6 pb-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGroups.map((group) => (
              <div 
                key={group.id} 
                className="group cursor-pointer"
                onClick={() => goToGroup(group.id)}
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 h-full flex flex-col">
                  {/* Card Header */}
                  <div className={`${getGroupColor(group.groupName)} p-5`}>
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
                        {group.groupName.substr(0, 1).toUpperCase()}
                      </div>
                      {/* <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                        {group.members?.length || 0} members
                      </div> */}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-5 flex-grow">
                    <h3 className="font-bold text-xl mb-2 text-gray-100 group-hover:text-white transition-colors">
                      {group.groupName}
                    </h3>
                    
                  </div>
                  
                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-2 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {group.lastMessage?.timestamp?.toDate 
                          ? new Date(group.messages.timestamp.toDate()).toLocaleDateString()
                          : "Activity"}
                      </span>
                      <div className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-full transform transition-transform group-hover:scale-105">
                        Join Chat
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg">No groups found matching "{searchTerm}"</div>
            <button 
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full transition-colors"
              onClick={() => setSearchTerm("")}
            >
              Show all groups
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;