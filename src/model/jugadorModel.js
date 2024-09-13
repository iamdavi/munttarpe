export class ModelJugador {

    positionOptions = [
        { title: 'Portero', value: 'portero' },
        { title: 'Central', value: 'central' },
        { title: 'Pivote', value: 'pivote' },
        { title: 'Lateral derecho', value: 'latde' },
        { title: 'Lateral izquierdo', value: 'latiz' },
        { title: 'Extremo derecho', value: 'extde' },
        { title: 'Extremo izquierdo', value: 'extiz' },
    ]

    typeOptions = [
        { title: 'Jugador', value: 'jugador' },
        { title: 'Entrenador', value: 'entrenador' },
        { title: '2º Entrenador', value: 'segentrenador' },
    ]

    manosOptions = [
        { title: 'Diestro', value: 'diestro' },
        { title: 'Zurdo', value: 'zurdo' },
    ]

    constructor() {
        this.tipo = "Jugador";
        this.nombre = "David";
        this.apellidos = "Otero Mato";
        this.descripcion = "En un lugar de la mancha de cuyo nombre no quiero acordarme";
        this.mote = "Gallego";
        this.genero = "Masculino";
        this.posicion = "Portero";
        this.dorsal = 26;
        this.mano = "Diestro";
        this.especialidad = "Contra-ataques";
    }

    getPositionOptions() {
        return this.positionOptions
    }

    getTypeOptions() {
        return this.typeOptions
    }

    getManosOptions() {
        return this.manosOptions
    }
}