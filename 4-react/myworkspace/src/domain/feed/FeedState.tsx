interface FeedState {
  id: number;
  commit: string | undefined;
  username: string | undefined;
  profileImg: string | undefined 
  createTime: number;
  modifyTime?: number;
  fileType?: string | undefined;
  dataUrl?: string | undefined;
}

export type { FeedState };