export const groupMultasByPlayer = async () => {
  await databaseStore.getMultasJugador();
  await databaseStore.getMultas();
  let result = [];
  let resultJugador;
  for (const mt of databaseStore.multasJugador) {
    if (!Object.keys(result).includes(mt.jugador)) {
      const jugadorData = databaseStore.jugadores.find((j) => j.id == mt.jugador)
      result[mt.jugador] = { ...jugadorData }
      result[mt.jugador]['multas'] = []
      console.log(result);
    }
    console.log(databaseStore.multas);

    const multaData = databaseStore.multas.find((m) => m.id == mt.concepto)
    result[mt.jugador]['multas'].push(multaData)
  }
}