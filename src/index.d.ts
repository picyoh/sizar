declare global {
  type Box = {
    id: string;
    type: string;
    label: string;
    confidence: number;
    avgHeight: number;
    bounding: Array<number>;
  };
}

export {};
