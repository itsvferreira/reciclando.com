export function buildQuery(city, categories, neighboorhood, search) {
  let query = '';

  if (search) query += 'search=' + search + '&';
  if (city) query += 'city=' + city + '&';
  if (neighboorhood) query += 'neighboorhood=' + neighboorhood + '&';
  if (categories.length > 0) query += 'category=' + categories.join('--');
  if (query.endsWith('&')) query = query.slice(0, query.length - 1);

  return query;
}
