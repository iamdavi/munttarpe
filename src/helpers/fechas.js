export const formatUnixTimestamp = (timestamp) => {
    // Convertir Timestamp a objeto Date
    const fecha = new Date(timestamp.seconds * 1000); // Convertir segundos a milisegundos

    // Obtener los componentes de la fecha
    const dia = String(fecha.getDate()).padStart(2, '0'); // Obtener el día
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtener el mes (0-11)
    const anio = fecha.getFullYear(); // Obtener el año

    // Formatear la fecha en 'DD/MM/AAAA'
    return `${dia}/${mes}/${anio}`;
}