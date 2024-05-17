const swaggerAutogen = require('swagger-autogen')

const options = {
  openapi: '3.0.0',
  autoBody: true,
  autoQuery: true
}

const doc = {
  info: {
    version: '', // by default: '1.0.0'
    title: 'My Life Fitness', // by default: 'REST API'
    description: '' // by default: ''
  },
  host: 'pit2-api.pd8edx.easypanel.host', // by default: 'localhost:3000'
  basePath: '/api', // by default: '/'
  schemes: ['https'], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '' // Tag description
    }
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object
  components: {
    schemas: {
      cadastrarAlimento: {
        nome: '',
        calorias: 0,
        carboidratos: 0,
        proteinas: 0,
        gorduras: 0
      },
      cadastrarAlimentoLista: [
        {
          nome: '',
          calorias: 0,
          carboidratos: 0,
          proteinas: 0,
          gorduras: 0
        }
      ],
      cadastrarDieta: {
        clienteId: 0,
        objetivoFoco: '',
        dietaAtual: false,
        alimentos: [
          {
            alimentoId: 0,
            horario: '1970-01-01T09:00:00Z',
            pesoGramas: 0
          }
        ],
        nutricionista: {
          nutricionistaId: 0
        }
      },
      atualizarDieta: {
        id: 0,
        clienteId: 0,
        objetivoFoco: '',
        dietaAtual: false,
        alimentos: [
          {
            alimentoId: 0,
            horario: '1970-01-01T09:00:00Z',
            pesoGramas: 0
          }
        ]
      },
      cadastrarMedidas: {
        clienteId: 0,
        altura: 0,
        peso: 0
      },
      atualizarMedidas: {
        id: 0,
        clienteId: 0,
        altura: 0,
        peso: 0
      },
      usuarioClienteLogin: {
        email: '',
        senha: ''
      },
      usuarioClienteCadastrar: {
        email: '',
        senha: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        cliente: {
          objetivo: '',
          observacao: ''
        }
      },
      usuarioClienteSolicitarDieta: {
        clienteId: 0,
        objetivoFoco: '',
        nutricionista: {
          nutricionistaId: 0
        }
      },
      usuarioClienteAtualizarPerfil: {
        cliente: {
          objetivo: '',
          observacao: ''
        }
      },
      nutricionistaLogin: {
        email: '',
        senha: ''
      },
      nutricionistaCadastrar: {
        email: '',
        senha: '',
        nome: '',
        sobrenome: '',
        telefone: '',
        nutricionista: {
          uf: '',
          crm: '',
          crn: ''
        }
      }
    }
  }
}

const outputFile = './api/swagger.json'
const routes = ['./api/routes/index.ts']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(options)(outputFile, routes, doc)
