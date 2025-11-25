import { useState } from "react";
import { createRoot } from "react-dom/client";

function MyForm() {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: ""   });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let output =
      "Name: " + formData.name + "\nAge: " + formData.age +
      "\nEmail: " + formData.email + "\nPhone: " + formData.phone +
      "\nAddress: " + formData.address +"\nCity: " + formData.city +
      "\nCountry: " + formData.country;

    alert(output);
    console.log("Submitted Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>User Information</h2>

      <div>
        <label>Name: </label>
        <input 
          type="text"
          name="name" 
          value={formData.name}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Age: </label>
        <input 
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Email: </label>
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Phone: </label>
        <input 
          name="phone"
          value={formData.phone}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Address: </label>
        <input 
          name="address"
          value={formData.address}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>City: </label>
        <input 
          name="city"
          value={formData.city}
          onChange={handleInput}
        />
      </div>
      <div>
        <label>Country: </label>
        <input 
          name="country"
          value={formData.country}
          onChange={handleInput}
        />
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

createRoot(document.getElementById("root")).render(<MyForm />);
