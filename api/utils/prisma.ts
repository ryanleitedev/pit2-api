import { PrismaClient } from '@prisma/client'
// export const prisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query'
//     }
//   ]
// })

// prisma.$on('query', e => {
//   console.log(`${e.query}, ${e.params}`)
// })

export const prisma = new PrismaClient()
