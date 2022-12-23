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

  if (email && password && email == 'hi@test.com' && password == 'password') {
    // we have not to extend the session type declaration and correct it, beucause it is will implemented
    req.session = { isLoggedIn: true }
    res.redirect('/')
  } else {
    res.send('invalid email or password')
  }
})

export { router }