export function buildQuery(city, categories) {
  let query = '';

  if (city) query += 'city=' + city + '&';
  if (categories.length > 0) query += 'category=' + categories.join('--');

  return query;
}
