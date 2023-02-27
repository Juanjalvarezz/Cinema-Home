const {equipos} = require ("../models/estrutura")

class equiposController {
    Listar(){
            return equipos;
    }

    crear(equipo){
        equipos.push(equipo);
        return (equipos);
    }
    
    Buscar(aparato){
        var id = + aparato;
        var search = equipos.findIndex(u => u.id == id)
        var res = "El id -- " + id + "-- corresponde al equipo: " + equipos[search].nombre;
        return(res);
      }
    
      Actualizar(aparato , newEquipo){
        var id = + aparato;
        var search = equipos.findIndex(u => u.id == id)
        if (search == "-1" ){
          console.log("El equipo con id " + id + " no existe");
        }else if(equipos[search].id == id){ 
          console.log("El equipo con id "+ id + "sera actualizado");
          console.log(equipos[search]);
          equipos[search]= newEquipo;
          console.log("El equipo ha sido actualizado");
          console.log(equipos[search]);
        }
      }

      Eliminar(aparato){
        var id = + aparato;
        var search = equipos.findIndex(u => u.id == id)
        if (search == "-1" ){
          console.log("El equipo con id " + id + " no existe");
        }else if(equipos[search].id == id){
          console.log("El equipo con id "+ id + " ha sido eliminado ");
          equipos.splice(search,1);
        }
      }
    } 


module.exports = new equiposController();