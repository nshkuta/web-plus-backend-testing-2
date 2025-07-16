import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      expect(result).toHaveLength(4);
      expect(result).toEqual(expect.arrayContaining(posts));
    });

    it('should return correct posts for skip and limit options', () => {
      // Проверяем skip = 1, limit = 2
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { text: 'Post 2' },
        { text: 'Post 3' },
      ]);

      // Проверяем skip = 0, limit = 3
      const result2 = postsService.findMany({ skip: 0, limit: 3 });
      expect(result2).toHaveLength(3);
      expect(result2).toEqual([
        { text: 'Post 1' },
        { text: 'Post 2' },
        { text: 'Post 3' },
      ]);
    });

    it('should handle limit correctly when exceeding total posts', () => {
      const result = postsService.findMany({ limit: 10 });
      expect(result).toHaveLength(4);
      expect(result).toEqual(posts);
    });

    it('should handle skip correctly when exceeding total posts', () => {
      const result = postsService.findMany({ skip: 10 });
      expect(result).toHaveLength(0);
    });

    it('should handle both skip and limit together', () => {
      const result = postsService.findMany({ skip: 2, limit: 1 });
      expect(result).toHaveLength(1);
      expect(result).toEqual([{ text: 'Post 3' }]);
    });

    it('should return empty array when both skip and limit are zero', () => {
      const result = postsService.findMany({ skip: 0, limit: 0 });
      expect(result).toHaveLength(0);
    });
  });
});
