/** Realizar una tabla de multiplicación de un número (a) desde 
0 hasta x, pero que no se muestre la multiplicación de a * 5. */

     
      let numa = parseInt (prompt("Ingresa tu numero a multiplicar"));
      let numx = parseInt (prompt("Ingresa tu numero limite"));
      
      let result;
      console.log ("Tabla de multiplicar desde el " + numa + " hasta el " + numx)
      for (let i = 0; i <= numx; i++) {
         if (i !== 5){
         result = numa * i;
         console.table (`${numa} x ${i} = ${result}`)}}
     