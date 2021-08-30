interface FeedState {
  id: number;
  commit: string | undefined;
  username: string | undefined;
  createTime: number;
  modifyTime?: number;
  fileType?: string | undefined;
  dataUrl?: string | undefined;
}

export type { FeedState };

interface TodoState {
  id: number;
  memo: string | undefined;
  createTime: number;
  modifyTime?: number;
  username: string | undefined;
  isEdit?: boolean;
}

export type { TodoState };

interface AlertProp1 {
  onClose?: () => void;
}

export type { AlertProp1 }