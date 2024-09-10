const axios = require("axios");
const { faker } = require("@faker-js/faker");

const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjAwYTg0My1kMzRiLTQzMTQtOGM5OC1jMjM4NWMwOGRlMzgiLCJyb2xlcyI6WyJST0xFX0NVU1RPTUVSIl0sImlhdCI6MTcyNTkzODcxNCwiZXhwIjoxNzI1OTM5NjE0LCJpc3MiOiJFbmlnbWEgU2hvcCJ9.0PfEnhazp-lxT3d65i_hQMwgrtFtDoNCpUcfhvFV8kq1bRQNj6hXox_lzp1XntTj1jDDxNzMB-NNTYbnAIma3Q";

for (let i = 0; i < 100; i++) {
  (async function () {
    try {
      await axios.post(
        "http://localhost:8080/api/products",
        {
          name: `product-${i}`,
          price: faker.commerce.price({ min: 10000, max: 100000, dec: 0 }),
          stock: faker.number.int({ min: 1, max: 100 }),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`${i + 1} product inserted`);
    } catch (err) {
      console.error(err);
    }
  })();
}
