interface ICachedAssets {
  [href: string]: Promise<string>;
}

export default ICachedAssets;
