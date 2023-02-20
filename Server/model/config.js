
module.exports = {
  adminProfile: {
    user: {
      type: "ObjectId",
      ref: "user",
      required: true,
    },
    inn: {
      type: "String",
    },
    kpp: {
      type: "String",
    },
    ogrn: {
      type: "String",
    },
    rs: {
      type: "String",
    },
    cs: {
      type: "String",
    },
    bik: {
      type: "String",
    },    
  },
  agreements: {
    doc_number: {// Номер документа
      type: "String",
      maxLength: 11,
    }, 
    doc_name: {
      type: "String",
    },   
    doc_type: {
      enum: [
        "agreement",
        "ext_agreement",        
      ],
    }, 
    head_agreement: {// Если тип дополнительное соглашение
      type: "ObjectId",
      ref: "agreement",
    },  
    client: {// Клиент
      type: "ObjectId",
      ref: "user",
    },
    doc_status: {// Статус
      enum: [
        "process",
        "pending",
        "closed",
      ],
    },
    services: {// Подключаемая услуга
      type: "ObjectId",
      ref: "service",
    }
  },

  notification: {
    user: {// Кому назначен
      type: "ObjectId",
      ref: "user",
    }, 
    from: {// От кого
      type: "ObjectId",
      ref: "user",
    },  
    type: {// Тип
      enum: [
        "service",
        "alert",        
      ],
    },
    title: {// Заголовка
      type: "String",      
    },
    text: {// Текст
      type: "String",      
    },
    link: {// Ссылка
      type: "String",      
    },
    read: {// Ссылка
      type: "Boolean",   
      default: false   
    }
  
  },

  ClientProfile: {
    user: {
      type: "ObjectId",
      ref: "user",
      required: true,
    },
    is_admin: {
      type: "Boolean",
      required: true,
    },
    partner: {
      type: "ObjectId",
      ref: "user",
    },
    agreement: {
      type: "String",
      // required: true,
    },
    service: {
      type: "String",
    },
    name: {
      type: "String",
    },
    inn: {
      type: "String",
    },
    kpp: {
      type: "String",
    },
    ogrn: {
      type: "String",
    },
    rs: {
      type: "String",
    },
    cs: {
      type: "String",
    },
    bik: {
      type: "String",
    },    
    person: {
      type: "String",
    },
    post: {
      type: "String",
    },

  },
  managerProfile: {

user: {
type: "ObjectId",
ref: "user",
required: true,
},

},
  PartnerProfile: {
    user: {
      type: "ObjectId",
      ref: "user",
      required: true,
    },
    clients: {
      type: "ObjectId",
      ref: "user",
    },
    name: {
      type: "String",
    },
    inn: {
      type: "String",
    },
    kpp: {
      type: "String",
    },
    ogrn: {
      type: "String",
    },
    person: {
      type: "String",
    },
    post: {
      type: "String",
    },
    percent: {
      type: "Number",
    },
    rs: {
      type: "String",
    },
    cs: {
      type: "String",
    },
    bik: {
      type: "String",
    },    
    functionality: {
      type: "String",
      enum: [
        "none",
        "client",
        "agent",
        "all"
      ],
    }
  },
  services: {
    client: {
      type: "ObjectId",
      ref: "user",
      required: true,
    },
/*
    Тип услуги
    0: Collocation
    1: Разработка сайта
    2: Администрирование серверов
    3: Доработка 1С
    4: Сопровождение 1С
    5: Облачное хранилище
*/
    service_type: {
      type: "String",
      required: true,
      enum: ["0", "1", "2", "3", "4", "5"]
    },
    service_price: {
      type: "Number",
    },
    service_status: {
      type: "String",
      enum: [
        "not_purchased",
        "in_work",
        "done"
      ],
      default: "in_work"
    },
    end_data: {
      type: "Date"
    },
    start_data: {
      type: "Date"
    },
    days: {
      type: "Number"
    },
    monthly: {
      type: "Boolean",
      default: false
    }

  },
  users: {
    email: {
      type: "String",
      required: true,
    },
    phone: {
      type: "String",
    },
    password : {
      type: "String",
      required: true
    },
    role: {
      type: "String",
      required: true,
      enum: [
        "Admin",
        "Manager",
        "Partner",
        "AdminClient",
        "PartnerClient"
      ]
    },
    surname: {
      type: "String",
    },
    name: {
      type: "String",
    },
    patronim: {
      type: "String",
    },
    updatedAt:{
      type: "Date",
      default: Date.now(),
    },
    isBaned: {
      type: "Boolean",
      default: false,
    },
    banReason: {
      type: "String",
    },
    img: {
      type: "String",
    },
  },

  ticket: {
    title: {
      type: 'String',
    },
    user: {
      type: "ObjectId",
      ref: "user",
      required: true
    },    
    close: {
      type: "Boolean",
    },
    service: {
      type: "String"
    },
    update: {
      type: "String"
    }
  },

  message:{
    title: {
      type: 'String',
    },
    ticket: {
      type:"ObjectId",
      ref: "ticket",
      required: true
    },
    text: {
      type: "String",
    },
    file: {
      type: "String",
    },
    user: {
      type: "ObjectId",
      ref: "user",
      required: true
    },
    destination: {
      type: "ObjectId",
      ref: "user",
    },
    read: {
      type: "Boolean",
      default: false
    },
    admin: {
      type: "Boolean",
    }
  }
};
