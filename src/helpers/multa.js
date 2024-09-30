import { useMultaStore } from "@/stores/multa";

export const groupMultasByPlayer = async () => {
  const multaStore = useMultaStore();
  await multaStore.getMultasJugador();
  await multaStore.getMultas();
  let result = [];
  let resultJugador;
  console.log(multaStore.multasJugador, multaStore.jugadoresEquipo);

  for (const mt of multaStore.multasJugador) {
    if (!Object.keys(result).includes(mt.jugador)) {
      const jugadorData = multaStore.jugadoresEquipo.find(
        (j) => j.id == mt.jugador
      );
      result[mt.jugador] = { ...jugadorData };
      result[mt.jugador]["multas"] = [];
    }

    const multaData = multaStore.multas.find((m) => m.id == mt.concepto);
    result[mt.jugador]["multas"].push(multaData);
  }
  console.log(result);

  multaStore.multasGroupedByJugador = result;
};