import { useState } from "react";
import { Container } from "./styles";
import "./App.css";

function App() {
  const [valorTela, setValorTela] = useState("");
  const [resultado, setResultado] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [acumulador, setAcumulador] = useState();
  const [operado, setOperado] = useState(false);

  const Tela = (valor, res) => {
    return (
      <div className="visor">
        <span>{valor}</span>
        <span>{res}</span>
      </div>
    );
  };

  const Btn = (label, onClick) => {
    return (
      <button onClick={onClick} className="btn">
        {label}
      </button>
    );
  };

  //FUNCOES
  const addDigitoTela = (d) => {
    if ((d === "+" || d === "-" || d === "*" || d === "/") && operado) {
      console.log("+-*/");
      setOperado(false);
      setValorTela(resultado + d);
      return;
    }
    if (operado) {
      setValorTela(d);
      setOperado(false);
      return;
    }
    const valorDigitadoTela = valorTela + d;
    setValorTela(valorDigitadoTela);
  };

  const limparMemoria = () => {
    setOperado(false);
    setValorTela("");
    setResultado(0);
    setAcumulador(0);
    return;
  };

  const operacao = (oper) => {
    if (oper === "bs") {
      let vtela = valorTela;
      vtela = vtela.substring(0, vtela.length - 1);
      setValorTela(vtela);
      setOperado(false);
      return;
    }
    try {
      // eslint-disable-next-line no-eval
      const r = eval(valorTela);
      setAcumulador(r);
      setResultado(r);
      setOperado(true);
    } catch {
      setResultado("ERRO");
    }
  };

  return (
    <>
      <h3>Simple calculator</h3>
      <Container className="contCalc">
        {Tela(valorTela, resultado)}
        <div className="teclasPai">
          {Btn("AC", limparMemoria)}
          {Btn("(", () => addDigitoTela("("))}
          {Btn(")", () => addDigitoTela(")"))}
          {Btn("/", () => addDigitoTela("/"))}
          {Btn("7", () => addDigitoTela("7"))}
          {Btn("8", () => addDigitoTela("8"))}
          {Btn("9", () => addDigitoTela("9"))}
          {Btn("*", () => addDigitoTela("*"))}
          {Btn("4", () => addDigitoTela("4"))}
          {Btn("5", () => addDigitoTela("5"))}
          {Btn("6", () => addDigitoTela("6"))}
          {Btn("-", () => addDigitoTela("-"))}
          {Btn("1", () => addDigitoTela("1"))}
          {Btn("2", () => addDigitoTela("2"))}
          {Btn("3", () => addDigitoTela("3"))}
          {Btn("+", () => addDigitoTela("+"))}
          {Btn("0", () => addDigitoTela("0"))}
          {Btn(".", () => addDigitoTela("."))}
          {Btn("<", () => operacao("bs"))}
          {Btn("=", () => operacao("="))}
        </div>
      </Container>
    </>
  );
}

export default App;
