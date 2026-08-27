import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus
} from "lucide-react";

import "./App.css";

function App() {

  const [page, setPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [chatOpen, setChatOpen] = useState(false);
const [chatMessage, setChatMessage] = useState("");
const [chatMessages, setChatMessages] = useState([
  {
    sender: "bot",
    text: "Hi! 👋 I'm ShopSphere Assistant. How can I help you?"
  }
]);

  useEffect(() => {
    fetch("https://shopsphere-backend-ox4e.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log("Product error:", err);
      });
  }, []);

  const filteredProducts = products.filter((product) => {

    const name = product.name || "";

    const matchSearch = name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      product.category === category;

    return matchSearch && matchCategory;
  });
  const sendChatMessage = () => {

  if (!chatMessage.trim()) return;

  const message = chatMessage.trim();

  setChatMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: message
    }
  ]);

  let reply =
    "You can ask me about products, prices, categories or your cart.";

  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    reply = "Hello! 👋 Welcome to ShopSphere!";
  }

  else if (msg.includes("headphone")) {
    reply = "Wireless Bluetooth Headphones are available for AED 57.71.";
  }

  else if (msg.includes("watch")) {
    reply = "Smart Watch Series 5 is available for AED 84.66.";
  }

  else if (msg.includes("shoe")) {
    reply = "Premium Running Shoes are available for AED 73.11.";
  }

  else if (msg.includes("electronics")) {
    reply = "We have headphones and smart watches in Electronics.";
  }

  else if (msg.includes("fashion")) {
    reply = "Fashion includes shoes, backpacks, sunglasses and T-shirts.";
  }

  else if (msg.includes("home")) {
    reply = "Home products include a desk lamp and ceramic mug.";
  }

  else if (msg.includes("cart")) {
    reply = `You currently have ${cart.length} product(s) in your cart.`;
  }

  setChatMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: reply
    }
  ]);

  setChatMessage("");
};

  const addToCart = (product) => {

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }
  };

  const removeFromCart = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    );

  };

  const increase = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };

  const decrease = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * item.quantity,
    0
  );


      if (page === "about") {
  return (
    <div className="app">
      <nav className="navbar">
        
        <h1
          className="logo"
          onClick={() => setPage("home")}
        >
          ShopSphere
        </h1>
      </nav>

      <About />

      <footer>
        <h2>ShopSphere</h2>
        <p>Smart shopping made simple.</p>
      </footer>
    </div>
  );
}

if (page === "contact") {
  return (
    <div className="app">
      <nav className="navbar">
        <h1
          className="logo"
          onClick={() => setPage("home")}
        >
          ShopSphere
        </h1>
      </nav>

      <Contact />

      <footer>
        <h2>ShopSphere</h2>
        <p>Smart shopping made simple.</p>
      </footer>
    </div>
  );
}

if (page === "privacy") {
  return (
    <div className="app">
      <nav className="navbar">
        <h1
          className="logo"
          onClick={() => setPage("home")}
        >
          ShopSphere
        </h1>
      </nav>

      <Privacy />

      <footer>
        <h2>ShopSphere</h2>
        <p>Smart shopping made simple.</p>
      </footer>
    </div>
  );
}

if (page === "affiliate") {
  return (
    <div className="app">
      <nav className="navbar">
        <h1
          className="logo"
          onClick={() => setPage("home")}
        >
          ShopSphere
        </h1>
      </nav>

      <AffiliateDisclosure />

      <footer>
        <h2>ShopSphere</h2>
        <p>Smart shopping made simple.</p>
      </footer>
    </div>
  );
}
return (
<div className="app">

      <div className="chatbot">

      {chatOpen && (
        <div className="chat-window">

          <div className="chat-header">
            <span>🤖 ShopSphere Assistant</span>

            <button onClick={() => setChatOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-body">

            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}

          </div>

          <div className="chat-input-area">

            <input
              type="text"
              placeholder="Ask me something..."
              value={chatMessage}
              onChange={(e) =>
                setChatMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendChatMessage();
                }
              }}
            />

            <button onClick={sendChatMessage}>
              Send
            </button>

          </div>

        </div>
      )}

      <button
        className="chatbot-button"
        onClick={() => setChatOpen(true)}
      >
        💬
      </button>

    </div>

      <nav className="navbar">

        <h1 className="logo">
          ShopSphere
        </h1>

        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="cart-button">

          <ShoppingCart size={20} />

          Cart ({cart.length})

        </div>

      </nav>

      <div className="category-bar">

        {[
          "All",
          "Electronics",
          "Fashion",
          "Home"
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setCategory(item)
            }
          >
            {item}
          </button>

        ))}

      </div>

      <section className="hero">

        <div>

          <p>SMART SHOPPING</p>

          <h2>
            Everything You Need.
          </h2>

          <h2>
            All in One Place.
          </h2>

          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Shop Now →
          </button>

        </div>

      </section>

      <section className="features">

        <div>
          🚚
          <strong>Free Delivery</strong>
          <span>On orders above AED 38.47</span>
        </div>

        <div>
          🔒
          <strong>Secure Payment</strong>
          <span>100% secure checkout</span>
        </div>

        <div>
          ↩️
          <strong>Easy Returns</strong>
          <span>7-day return policy</span>
        </div>

        <div>
          🤖
          <strong>AI Assistant</strong>
          <span>Smart shopping help</span>
        </div>

      </section>

      <main
        id="products"
        className="products-section"
      >

        <h2>Featured Products</h2>

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="product-info">

                <small>
                  {product.category}
                </small>

                <h3>
                  {product.name}
                </h3>

                <p>
                  ⭐ {product.rating || 4.5}
                </p>

                <strong>
                 AED {(Number(product.price || 0) * 0.0385).toFixed(2)}
                </strong>

                <button
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  <ShoppingCart size={17} />
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </main>

      {cart.length > 0 && (

        <section className="cart-box">

          <div className="cart-title">

            <h2>Your Cart</h2>

            <button
              onClick={() => setCart([])}
            >
              Clear
            </button>

          </div>

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>

                <h3>{item.name}</h3>

                <p>
    AED {(Number(item.price || 0) * 0.0385).toFixed(2)}
   </p> 

                <div className="quantity">

                  <button
                    onClick={() =>
                      decrease(item.id)
                    }
                  >
                    <Minus size={15} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increase(item.id)
                    }
                  >
                    <Plus size={15} />
                  </button>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  <Trash2 size={15} />
                  Remove
                </button>

              </div>

            </div>

          ))}

          <h2>
  Total: AED {(total * 0.0385).toFixed(2)}
</h2>

        </section>

      )}

      <footer>

  <div>
    <h2>ShopSphere</h2>

    <p>
      Smart shopping made simple.
    </p>
  </div>

  <div className="footer-links">

    <button onClick={() => setPage("about")}>
      About Us
    </button>

    <button onClick={() => setPage("contact")}>
      Contact Us
    </button>

    <button onClick={() => setPage("privacy")}>
      Privacy Policy
    </button>

    <button onClick={() => setPage("affiliate")}>
      Amazon Affiliate Disclosure
    </button>

  </div>

  <p>
    ©️ 2026 ShopSphere
  </p>

</footer>

    </div>
  );
}

export default App;