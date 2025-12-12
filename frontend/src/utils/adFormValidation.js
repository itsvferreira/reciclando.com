export default function adFormValidation(values, image) {
  const errors = {};

  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  const postalCodeRegex = /^\d{8}$/;

  if (isEmpty(values.title)) errors.title = 'Título é obrigatório';
  else if ((values.title || '').trim().length < 5)
    errors.title = 'Título deve ter minímo de 5 caracteres';

  if (isEmpty(values.description))
    errors.description = 'Descrição é obrigatória';

  if (!image) errors.image = 'Imagem é obrigatória';

  if (values.category.length == 0)
    errors.category = 'Categoria do material é obrigatória';

  if (isEmpty(values.postalCode)) errors.postalCode = 'CEP é obrigatório';
  else if (!values.postalCode.match(postalCodeRegex))
    errors.postalCode = 'CEP deve conter 8 digitos';

  if (isEmpty(values.phone)) errors.phone = 'Telefone é obrigatório';
  else if (!values.phone.match(phoneRegex))
    errors.phone = 'Telefone possui formato inválido';

  if (isEmpty(values.email)) errors.email = 'E-mail é obrigatório';
  else if (!values.email.match(emailRegex))
    errors.email = 'Formato de e-mail inválido';

  return errors;
}

function isEmpty(value) {
  return value === undefined || value === null || value.trim() == '';
}
