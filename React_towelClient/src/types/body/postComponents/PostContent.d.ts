export interface Article {
    _id: string;
    user: {
      username: string;
      headimg: string;
    };
    postText: string;
    postComment: number;
    postLike: number;
    postFavorite: number;
    postImages: string[];
    postVideos: string[];
    postUserId: string;
    postTitle: string;
    postCreateDate: string;
  }