export type Status = 'failed' | 'success';

export interface APIResponse {
  status: Status;
  code: number;
  message: string;
  data: any;
}
