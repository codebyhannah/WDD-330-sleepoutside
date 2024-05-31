const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const resJson = await res.json();
  if (res.ok) {
    /*console.log(resJson);*/
    return resJson;
  } else {
    throw { name: "servicesError", message: resJson };
  }
}

export default class ExternalServices {
  constructor(category) {
    /*this.category = category;
    this.path = `../json/${this.category}.json`;*/
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    console.log("beginning of error");
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/"/*"https://wdd330-backend.onrender.com:3000/checkout"*/, options).then(convertToJson);
  }
}