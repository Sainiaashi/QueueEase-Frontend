import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAvailableMenu, getRecommendations } from "../api/menuApi";

function Menu() {
  const [items, setItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu();
    fetchRecommendations();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAvailableMenu();
      setItems(response.data);
    } catch {
      setError("Unable to load menu.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await getRecommendations();
      setRecommendations(response.data);
    } catch {
      setRecommendations([]);
    } finally {
      setRecLoading(false);
    }
  };

  const grouped = items.reduce((acc, item) => {
    const category = item.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading Menu...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                Smart Restaurant Platform
              </span>

              <h1 className="text-5xl font-extrabold mt-6 leading-tight">
                Welcome to
                <br />
                QueueEase
              </h1>

              <p className="mt-6 text-lg text-blue-100 leading-8">
                Skip long waiting lines and enjoy a seamless dining experience
                with AI-powered recommendations, digital menu, live queue
                tracking and automatic billing.
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">

                <Link
                  to="/join-queue"
                  className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  Join Queue
                </Link>

                <a
                  href="#menu"
                  className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
                >
                  View Menu
                </a>

              </div>

            </div>

            <div>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl">
                  <div className="text-5xl">🍽️</div>
                  <h3 className="font-bold mt-4">Digital Menu</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Browse dishes with ingredients and live pricing.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl">
                  <div className="text-5xl">🪑</div>
                  <h3 className="font-bold mt-4">Virtual Queue</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Join the waiting queue without standing outside.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl">
                  <div className="text-5xl">🤖</div>
                  <h3 className="font-bold mt-4">AI Recommendation</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Discover dishes personalized for your taste.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-xl">
                  <div className="text-5xl">💳</div>
                  <h3 className="font-bold mt-4">Auto Billing</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Instant bill generation with complete order history.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* AI */}

      {!recLoading && recommendations.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-16">

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✨</span>
            <div>
              <h2 className="text-3xl font-bold">
                AI Recommended Dishes
              </h2>
              <p className="text-gray-500">
                Personalized recommendations powered by AI
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-bold text-xl">{rec.name}</h3>

                <p className="mt-3 opacity-90">
                  {rec.reason}
                </p>

                <span className="inline-block mt-5 bg-white/20 px-3 py-1 rounded-full text-sm">
                  AI PICK
                </span>
              </div>
            ))}

          </div>

        </section>
      )}

      {/* MENU */}

      <section
        id="menu"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="flex justify-between items-center mb-12">

          <div>

            <h2 className="text-4xl font-bold">
              Explore Our Menu
            </h2>

            <p className="text-gray-500 mt-2">
              Freshly prepared dishes with live availability.
            </p>

          </div>

          <Link
            to="/join-queue"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
          >
            Join Queue
          </Link>

        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {Object.entries(grouped).map(([category, categoryItems]) => (

          <div key={category} className="mb-14">

            <h2 className="text-2xl font-bold mb-6">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {categoryItems.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6"
                >

                  <div className="flex justify-between">

                    <h3 className="text-xl font-bold">
                      {item.name}
                    </h3>

                    <span className="text-blue-600 font-bold">
                      ₹{item.price}
                    </span>

                  </div>

                  {item.description && (
                    <p className="text-gray-600 mt-4">
                      {item.description}
                    </p>
                  )}

                  {item.ingredients && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                        Ingredients
                      </p>

                      <p className="text-sm text-gray-600">
                        {item.ingredients}
                      </p>
                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>

        ))}

      </section>

      {/* FOOTER */}

      <footer className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12 text-center">

          <h2 className="text-3xl font-bold">
            QueueEase
          </h2>

          <p className="mt-4 text-gray-400">
            Smart Restaurant Management Platform
          </p>

          <p className="mt-2 text-gray-500 text-sm">
            Built for VibeAthon 6.0 • Team TeachEra
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Menu;