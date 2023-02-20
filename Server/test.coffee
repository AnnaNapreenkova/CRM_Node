$L =  console.log.bind console
User = require "./model/User"
user = 
    phone: "+7(545)644-97-99"
    email: "some@email.em"
    password: "$2a$10$70g.Py7OWyxjUo4ZkpCe9uKmeJiofiqVCMbHLgw7y3wFve1w2/FXe"
    role: "AdminClient"
    surname: "Так"
    name: "Меня"
    patronim: "Звали"
admin = {
      phone: "+7(000)000-00-00"
      email: "shatunov_sv@list.ru"
      password: "$2a$10$6DLdPhTHwNZWJmbPylLMk.Wk2favuPlwwIvpuxF/3aXMP/Heste2a"
      role: "Admin"
    };             

do => try
    $L await User.save admin
    #$L await User.update user, where: id:3
catch _ then console.log _