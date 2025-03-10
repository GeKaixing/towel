export interface userarticles {
    _id: string;
    user: {
      username: string;
      headimg: string;
    };
    postText: string;
    postComment: any[];
    postLike: any[];
    postFavorite: any[];
    postImages: string[];
    postVideos: string[];
    postUserId: string;
    postTitle: string;
  }