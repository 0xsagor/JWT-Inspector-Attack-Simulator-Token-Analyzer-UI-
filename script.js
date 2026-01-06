function base64UrlDecode(str) {
  return decodeURIComponent(
    atob(str.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

function decode() {
  warning.innerText = "";
  output.innerText = "";

  const token = document.getElementById("token").value.trim();
  if (!token) return;

  try {
    const [header, payload] = token.split(".");
    const decoded = {
      header: JSON.parse(base64UrlDecode(header)),
      payload: JSON.parse(base64UrlDecode(payload))
    };

    output.innerText = JSON.stringify(decoded, null, 2);
  } catch {
    warning.innerText = "Invalid JWT token format";
  }
}

function simulate() {
  warning.innerText =
    "Simulation: Tokens using 'alg:none' or weak secrets are vulnerable. This is an educational demo only.";
}
