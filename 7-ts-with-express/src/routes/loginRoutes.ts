import { Router, Request, Response, NextFunction } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.isLoggedIn) {
    next()
    return
  }
  res.status(403)
  res.send('not permitted')
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

router.get('/', (req: Request, res: Response) => {
  // this left check is a type guard, in order to access isLoggedIn in the right check
  if (req.session && req.session.isLoggedIn) {
    res.send(`
       <div> 
           <div> You are logged in </div> 
           <a  href="/logout"> Logout </a>  
       </div> 
    `)
  } else {
    res.send(`
    <div> 
         <div> You are not logged in </div> 
         <a href="/login"> Login </a> 
    </div> 
   `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('welcome to protected route, logged in user')
})

export { router }
