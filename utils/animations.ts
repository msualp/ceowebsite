// utils/animations.ts
export const particleTransformTemplate = ({ x, y, scale }: any) =>
  `translate(${x}, ${y}) translate(${x ? x.toString() : '0'}, ${y ? y.toString() : '0'}) scale(${scale})`;
