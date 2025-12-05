import { useMemo, useState } from "react";

const API_BASE = import.meta.env.DEV
  ? import.meta.env.VITE_API_HOST || "http://localhost:8081"
  : "";

function App() {
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const endpoint = useMemo(() => {
    const sanitized = API_BASE.replace(/\/$/, "");
    return `${sanitized}/api/v1/discounts`;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    const amountValue = parseFloat(amount);
    const percentageValue = parseFloat(percentage);

    if (
      Number.isNaN(amountValue) ||
      Number.isNaN(percentageValue) ||
      amountValue <= 0 ||
      percentageValue <= 0
    ) {
      setError("Ingresa valores válidos para cantidad y porcentaje.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountValue,
          percentage: percentageValue,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message || "No se pudo calcular el descuento.");
        return;
      }

      setResult(payload.data);
    } catch (err) {
      setError(
        "Ocurrió un error al comunicarse con el servicio de descuentos.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">
            Alexis Leonardo Noriega Rangel - 10B
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Calculadora de descuentos</h2>
        <hr />
        <form className="row gy-3" onSubmit={handleSubmit}>
          <div className="col-12 col-md-4">
            <div className="form-floating">
              <input
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                id="amount"
                placeholder="Cantidad $"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <label htmlFor="amount">Cantidad $</label>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-floating">
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                className="form-control"
                id="percentage"
                placeholder="Porcentaje %"
                value={percentage}
                onChange={(event) => setPercentage(event.target.value)}
              />
              <label htmlFor="percentage">Porcentaje %</label>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <button
              type="submit"
              className="btn btn-primary col-12 h-100"
              disabled={loading}
            >
              {loading ? "Calculando..." : "Calcular descuento"}
            </button>
          </div>
        </form>
        <br />
        {error && <div className="alert alert-danger">{error}</div>}
        {result && (
          <div className="alert alert-success">
            <h3>Resultado</h3>
            <p>Monto: ${result.amount?.toFixed(2)}</p>
            <p>Porcentaje: {result.percentage?.toFixed(2)}%</p>
            <p>Descuento: ${result.discount?.toFixed(2)}</p>
            <p>Total: ${result.total?.toFixed(2)}</p>
          </div>
        )}
        {!error && !result && <h3>Resultado: 0</h3>}
      </div>
    </>
  );
}

export default App;
