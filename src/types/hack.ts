export interface Hack {
  id: number;
  title: string;
  description: string;
  question: string;
  tags: number[];
  authorId: number;
  createdAt: number;
  likes: number;
  likedBy: number[];
}
