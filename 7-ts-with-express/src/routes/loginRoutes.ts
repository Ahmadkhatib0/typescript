import { Router, Request, Response } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
  res.send(` 
        <form method="POST">
           <div>
             <label> Email </label> 
             <input  name="email" /> 
           </div> 
           <div> 
              <label> Password </label> 
              <input  type="password"  name="password" /> 
           </div>
           <button>Submit</button> 
        </form>`)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body
  if (email) res.send(email.toLowerCase())
  else res.send('you must provide an email ')
})

export { router }
