const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  let resJson = res.json();
  if (resJson.ok) {
    return resJson;/*res.json();*/
  } else {
    /*throw new Error("Bad Response");*/
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
    return await fetch("https://wdd330-backend.onrender.com:3000/checkout", options).then(convertToJson);
  }
}