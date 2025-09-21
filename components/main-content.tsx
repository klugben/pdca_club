import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Star } from "lucide-react"
import { Post } from "@/lib/posts"

interface MainContentProps {
  posts: Post[]
}

export function MainContent({ posts }: MainContentProps) {
  // 使用传入的文章数据
  const featuredPosts = posts.slice(0, 3) // 取前3篇作为精选

  const recentProjects = [
    {
      name: "目标管理系统",
      description: "基于PDCA循环的个人目标设定与跟踪工具",
      tech: ["目标设定", "进度跟踪", "反思总结"],
    },
    {
      name: "时间管理仪表板",
      description: "可视化时间分配和效率分析平台",
      tech: ["时间记录", "数据分析", "效率优化"],
    },
    {
      name: "习惯养成助手",
      description: "科学的习惯培养和持续改进系统",
      tech: ["习惯跟踪", "数据洞察", "自我激励"],
    },
  ]

  return (
    <main className="flex-1 p-8">
      {/* 头部介绍 */}
      <section className="mb-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">欢迎来到 PDCA 自我管理博客</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            这里分享关于自我管理、个人成长、PDCA循环实践和持续改进的经验与感悟。让我们一起通过科学的方法论实现更好的自己。
          </p>
        </div>
      </section>

      {/* 精选文章 */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">精选文章</h2>
          <Button variant="outline" className="text-sm bg-transparent">
            查看全部 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.featured && (
                        <Badge variant="default" className="bg-accent text-accent-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          精选
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-accent cursor-pointer transition-colors">
                      {post.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 最新实践 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">最新实践</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 关于我 */}
      <section id="about" className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">关于我</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                我是一名专注于自我管理和持续改进的实践者，多年来致力于通过PDCA循环方法论实现个人成长。
                热衷于分享自我管理经验，帮助更多人建立科学有效的个人管理系统。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                在这个博客中，我会分享我在自我管理实践过程中的经验、遇到的挑战以及解决方案，
                希望能够为同样追求成长的朋友们提供一些帮助和启发。
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
