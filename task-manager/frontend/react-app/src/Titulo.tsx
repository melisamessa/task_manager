function Titulo() {
  const name = "Melisa Messa";
  if (name) {
    return <h1>Hola {name}</h1>;
  }
  return <p>Hola Mundo</p>;
}

export default Titulo;
