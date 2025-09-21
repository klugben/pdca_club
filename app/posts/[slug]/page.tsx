import { getPostDataWithHTML, getAllPosts } from "@/lib/posts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    // 通过slug查找对应的文章
    const allPosts = getAllPosts()
    const post = allPosts.find(p => p.slug === params.slug)

    if (!post) {
      notFound()
    }

    // 获取包含HTML内容的文章数据
    const postWithHTML = await getPostDataWithHTML(post.id)

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* 返回按钮 */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </Link>
          </div>

          {/* 文章头部 */}
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{postWithHTML.category}</Badge>
                {postWithHTML.featured && (
                  <Badge variant="default" className="bg-accent text-accent-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    精选
                  </Badge>
                )}
              </div>
              <CardTitle className="text-3xl mb-4 leading-tight">
                {postWithHTML.title}
              </CardTitle>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {postWithHTML.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {postWithHTML.readTime}
                </div>
                <div>
                  作者：{postWithHTML.author}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 文章内容 */}
          <Card>
            <CardContent className="pt-6">
              <div
                className="prose prose-gray max-w-none dark:prose-invert
                  prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-7
                  prose-strong:text-foreground
                  prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-muted
                  prose-blockquote:text-muted-foreground prose-blockquote:border-l-accent
                  prose-li:text-muted-foreground
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: postWithHTML.content || '' }}
              />
            </CardContent>
          </Card>

          {/* 标签 */}
          {postWithHTML.tags && postWithHTML.tags.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {postWithHTML.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 导航到其他文章 */}
          <div className="mt-12 text-center">
            <Link href="/">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                查看更多文章
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading post:', error)
    notFound()
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 生成页面元数据
export async function generateMetadata({ params }: PostPageProps) {
  try {
    const allPosts = getAllPosts()
    const post = allPosts.find(p => p.slug === params.slug)

    if (!post) {
      return {
        title: '文章未找到',
      }
    }

    return {
      title: `${post.title} | PDCA.Club`,
      description: post.excerpt,
    }
  } catch {
    return {
      title: '文章未找到',
    }
  }
}