import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@omerkhathab/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }, Variables: {
        userId : string
    }
  }>();
  

blogRouter.use('*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    try {
        const response = await verify(header, c.env.JWT_SECRET);
        c.set('userId',response.id);
        await next();
    } catch (e) {
        c.status(403);
        return c.json({message: "authentication failed", error: e});
    }
})

// create a blog
blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({message : "invalid inputs for creating blog"});
    }

    const userId = c.get('userId');

    const post = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : userId
        }
    })
    return c.json({
        id : post.id
    })
})

// update a blog
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({message : "invalid inputs for updating blog"});
    }

    const userId = c.get('userId');
    if(!userId) {
        c.status(411);
        return c.json({message : "invalid inputs (no user id) for updating blog"});
    }

    const post = await prisma.post.update({
        where : {
            id : body.id,
            authorId : userId
        },
        data : {
            title : body.title,
            content : body.content,
        }
    })
    return c.json({
        id : post.id
    })
})

// get all blogs
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select : {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        posts
    })
})

// get a blog
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    const blogId = c.req.param('id')
    try {
        const post = await prisma.post.findUnique({
            where : {
                id : blogId
            }, select : {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            post : post
        })
    } catch (e) {
        return c.json({message : "error while fetching the blog"});
    }
})

