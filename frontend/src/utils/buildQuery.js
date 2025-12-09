export function buildQuery(city, categories, search) {
  let query = '';

  if (search) query += 'search=' + search + '&';
  if (city) query += 'city=' + city + '&';
  if (categories.length > 0) query += 'category=' + categories.join('--');

  return query;
}
