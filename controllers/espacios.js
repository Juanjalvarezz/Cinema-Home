var {espacios} = require ("../models/estrutura")

class espaciosController {
    Listar(){
            return espacios;
    }

    crear(espacio){
        espacios.push(espacio);
        return (espacios);
    }
    
    Buscar(espacio){
        var id = + espacio;
        var search = espacios.findIndex(u => u.id == id)
        var res = "El id -- " + id + "-- corresponde al espacio: " + espacios[search].nombre;
        return(res);
      }
    
      Actualizar(espacio , newEspacio){
        var id = + espacio;
        var search = espacios.findIndex(u => u.id == id)
        if (search == "-1" ){
          console.log("El espacio con id " + id + " no existe");
        }else if(espacios[search].id == id){ 
          console.log("El espacio con id "+ id + "sera actualizado");
          console.log(espacios[search]);
          espacios[search]= newEspacio;
          console.log("El espacio ha sido actualizado");
          console.log(espacios[search]);
        }
      }

      Eliminar(espacio){
        var id = + espacio;
        var search = espacios.findIndex(u => u.id == id)
        if (search == "-1" ){
          console.log("El espacio con id " + id + " no existe");
        }else if(espacios[search].id == id){
          console.log("El espacio con id "+ id + " ha sido eliminado ");
          espacios.splice(search,1);
        }
      }
    } 



module.exports = new espaciosController();