import { useState } from "react";
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [step, setStep] = useState("welcome"); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    company: "",
    profilePic: ""
  });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
    if (user) {
      setCurrentUser(user);
      setStep("profile");
    } else {
      alert("Invalid credentials");
    }
  };

  
  const handleSignupStep1 = (e) => {
    e.preventDefault();
    if (users.find((u) => u.email === formData.email)) {
      alert("User already exists!");
      return;
    }
    setStep("signup-step2");
  };

  
  const handleSignupStep2 = (e) => {
    e.preventDefault();
    const newUser = { ...formData };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setStep("profile");
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      company: "",
      profilePic: ""
    });
  };

 
  const handleLogout = () => {
    setCurrentUser(null);
    setStep("welcome");
  };

  
  const handleProfilePicUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...currentUser, profilePic: reader.result };
        setCurrentUser(updatedUser);
        setUsers(users.map((u) => (u.email === updatedUser.email ? updatedUser : u)));
      };
      reader.readAsDataURL(file);
    }
  };

 


  if (step === "welcome") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-gray-100 to-blue-200" id="fpage">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center" >
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
            Welcome to PopX
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quos ab ut, possimus ipsam deserunt dolorum a incidunt consequatur totam sed nostrum commodi fugit voluptas dignissimos perferendis tempore laboriosam minima.</p>
          <button id="bt1"
            onClick={() => setStep("signup-step1")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold mb-4 shadow-md transition"
          >
            Create Account
          </button>
          <button id="bt2"
            onClick={() => setStep("login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
          >
            Already Resistered? Login
          </button>
        </div>
      </div>
    );
  }


  if (step === "login") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100" id="spage" >
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md"
        id="spage">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6" id="spage">
            Signin to your PopX account
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem blanditiis illum vero dignissimos magni tempora adipisci unde molestiae sed. Amet voluptatibus repellendus architecto magnam a omnis consectetur rerum nisi optio!
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  
  if (step === "signup-step1") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100"
      id="thpage">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Signin to your PopX account</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ab tempora, illo vel iste nobis quo est. Corrupti id, harum maiores, mollitia consequatur sunt magni iste in vitae tempore asperiores.</p>
          <form onSubmit={handleSignupStep1} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
            >
              Next →
            </button>
          </form>
        </div>
      </div>
    );
  }

  
  if (step === "signup-step2") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100" id="frpage">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create your popX account</h2>
          <form onSubmit={handleSignupStep2} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />


           <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />


            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold shadow-md transition"
            >
              Create Account 
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 5. PROFILE PAGE
  if (step === "profile" && currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome, {currentUser.name} 
          </h2>
          <div className="mt-6">
            {currentUser.profilePic ? (
              <img id="Profileimage"
                src={currentUser.profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-green-400 shadow-md mx-auto"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold mx-auto">
                No Pic
              </div>
            )}
          </div>
          <p className="mt-4 text-gray-700">Your Email= {currentUser.email}</p>
          <p className="text-gray-700">Your phone number {currentUser.phone}</p>
          <p className="text-gray-700">company name {currentUser.company}</p>

          <label className="mt-4 block text-sm text-gray-600">
            Change Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpdate}
              className="mt-2 block w-full text-sm text-gray-500 border rounded-lg p-2"
            />
          </label>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
