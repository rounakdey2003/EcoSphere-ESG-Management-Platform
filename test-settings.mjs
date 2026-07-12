
async function test() {
  const res = await fetch("https://eco-sphere-hv6w.onrender.com/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ environmentalWeight: 50, socialWeight: 25, governanceWeight: 25 }),
  });
  console.log(res.status);
  const text = await res.text();
  console.log(text);
}

test();
