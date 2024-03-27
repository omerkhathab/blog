import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@omerkhathab/medium-common';

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();
  

userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL
	}).$extends(withAccelerate());
	const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({message : "invalid inputs"});
  }
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
        name: body.name,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} 
  catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" , message : e});
	}
})

userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL
	}).$extends(withAccelerate());

	const body = await c.req.json();
  
  const {success} = signinInput.safeParse(body);
  if(!success) {
    c.status(411);
    return c.json({message : "invalid inputs"});
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }, select: {
      id: true
    }
  });

  if(!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });

})