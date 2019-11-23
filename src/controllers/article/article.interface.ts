/**
 * @interface
 * @description This defines the data accepted by the article api.
 * @exports Article
 */
interface Article {
  title: string
  author: {
    userId: string
    userName: string
    fullName: string
    avatarUrl: string
  }
  content: string
  tags: string[]
  timestamp: Date
  upVotes: number
}

export default Article;