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