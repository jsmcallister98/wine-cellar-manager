export function extractUser(req) {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const {
    name, email, bottles, wineracks, cellars, emailVerified,
  } = req.user;
  return {
    name, email, bottles, wineracks, cellars, emailVerified,
  };
}