export const processCategories = (categories) => {
  const categoryContent = categories.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w ]+/g) || [];
  return categoryContent.map((categoryName) => ({
    where: { name: categoryName },
    create: { name: categoryName },
  }));
};
