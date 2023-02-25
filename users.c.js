var usuarios= [
    {
      id:1,
      nombre:"Jose",
    },
    {
      id:2,
      nombre:"JMCA",
    },
    {
      id:3,
      nombre:"Marco",
    }
  ]


class userController {
  Listar(){
    console.log('con listar')
    return usuarios;
  }


  crear(usuario){
    usuarios.push(usuario);
    console.log("Se ha creado un usuario");
    return (usuarios);
  }


  Buscar(dni){
    var id = + dni;
    var usuario = usuarios.find(u => u.id === id);
    var res = "El usuario con id -- " + id + "-- es: " + usuario.nombre;
    return(res);
  }


  Actualizar(dni , NewU){
    var id = + dni;
    var usuario = usuarios.findIndex(u => u.id === id)
    if (usuario == "-1" ){
      console.log("El usuario con id " + id + " no existe");
    }else if(usuarios[usuario].id == id){
      console.log(usuarios[usuario]);
      usuarios[usuario]= NewU;
      console.log("El usuario ha sido actualizado " );
      console.log(usuarios[usuario]);
    }
  }

  Eliminar(dni){
    var id = + dni;
    var usuario = usuarios.findIndex(u => u.id === id)
    if (usuario == "-1" ){
      console.log("El usuario con id " + id + " no existe");
    }else if(usuarios[usuario].id == id){
      console.log("El usuario con id "+ id + " ha sido eliminado ");
      usuarios.splice(usuario,1);
    }
  }
} 

module.exports = new userController()