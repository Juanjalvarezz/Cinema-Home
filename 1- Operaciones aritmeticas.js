/* Realizar una función que nos permita realizar las 4 operaciones aritméticas, es decir,
que nos permita sumar, restar, dividir y multiplicar. La función debe recibir 3 parámetros,
dos de ellos deben ser los valores (a y b) y uno el nombre de la operación (en minúsculas).
Si el parámetro de la operación no es válido que mande un error personalizado a la consola

edicion master jmca */

do { opcion = (prompt("Bienvenido, por favor seleccione una de las siguientes opciones: \n 1- Suma \n 2- Resta \n 3- Division \n 4- Multiplicacion \n -----------------------------------------  \n 0- Finalizar"))
switch (opcion) {

    case "suma":
        let valor1 = parseInt (prompt ("Ingresa el valor 1 de tu suma"));
        let valor2 = parseInt (prompt ("Ingresa el valor 2 de tu suma"));
        console.log (valor1 + valor2);

    break;

    case "resta":
        let valora = prompt ("Ingresa el valor 1 de tu resta");
        let valorb = prompt ("Ingresa el valor 2 de tu resta");
        console.log (valora - valorb);

    break;

    case  "multiplicacion":
        let valor = prompt ("Ingresa el valor 1 de tu multiplicacion");
        let valo = prompt ("Ingresa el valor 2 de tu multiplicacion");
        console.log (valor * valo);

    break;

    case "division":
        let val = prompt ("Ingresa el valor 1 de tu division");
        let va = prompt ("Ingresa el valor 2 de tu division");
        console.log (val / va);

    break;

    default:
        console.error (`La operacion ${opcion} no es valida`)

}
}

while (opcion !=0)
