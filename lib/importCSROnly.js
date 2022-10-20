/** Import Client Side Only */
export default async (i) => {
  return typeof window !== 'undefined' ? await i() : {};
};
