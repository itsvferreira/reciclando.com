import Categories from '../Categories/Categories';
import styles from './AdForm.module.css';
import { useEffect, useState } from 'react';
import adFormValidation from '../../utils/adFormValidation';
import { useNavigate } from 'react-router-dom';
import { scrollToView } from '../../utils/scrollToView';
import { adsService } from '../../services/api';
import { useFetchAd } from '../../hooks/useFetchAdData';
import { useViaCep } from '../../hooks/useViaCep';

export default function Form({ id, donorId }) {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/user-profile`);
  };

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidPostalCode, setIsValidPostalCode] = useState(true);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    category: [],
    donorId: donorId,
    city: '',
    state: '',
    postalCode: '',
    donorContact: '',
    donorEmail: '',
  });

  useFetchAd(id, setFormData, setCategories);
  useViaCep(formData.postalCode, setAddress, setIsValidPostalCode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = setBody();

    const errorFields = adFormValidation(body, image, id, isValidPostalCode);
    setErrors(errorFields);
    scrollToView(Object.keys(errorFields)[0]);

    if (Object.keys(errorFields).length > 0) {
      return;
    }

    try {
      if (!id) {
        const payload = new FormData();
        payload.append('files', image);
        payload.append(
          'postRequest',
          new Blob([JSON.stringify(body)], { type: 'application/json' })
        );
        const response = await adsService.create(payload);
        console.log('Dados enviados com sucesso:', response.data);
      } else {
        const response = await adsService.update(id, body);
        console.log('Dados atualizados com sucesso:', response.data);
      }

      goToProfile();
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  const setBody = () => {
    return {
      ...formData,
      category: categories,
      city: address.localidade,
      state: address.uf,
      neighborhood: address.bairro,
    };
  };

  return (
    <div className={styles['form-container']} style={{ maxWidth: '800px' }}>
      <h2>Informações do Anúncio</h2>
      <p>
        Preencha os dados abaixo para criar seu anúncio de materiais recicláveis
      </p>
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className='col-md-12'>
          <label htmlFor='title' className='form-label'>
            Título do Anúncio
          </label>
          <input
            type='text'
            className='form-control'
            name='title'
            id='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Ex: Papelão e garrafas PET para doação'
            style={
              errors.title
                ? {
                    borderColor: 'red',
                    boxShadow: 'none',
                  }
                : {}
            }
          />
          {errors.title && (
            <small className='text-danger'>{errors.title}</small>
          )}
        </div>
        <div className='col-md-12'>
          <label htmlFor='description' className='form-label'>
            Descrição
          </label>
          <textarea
            className={`form-control ${styles.textarea}`}
            placeholder='Descreva os materiais que você tem disponível, quantidade aproximada e qualquer informação adicional relevante...'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            style={
              errors.description
                ? {
                    borderColor: 'red',
                    boxShadow: 'none',
                  }
                : {}
            }
          ></textarea>
          {errors.description && (
            <small className='text-danger'>{errors.description}</small>
          )}
        </div>
        {!id && (
          <div className='col-md-12'>
            <label htmlFor='image' className='form-label'>
              Foto do Material
            </label>
            <input
              type='file'
              name='image'
              className='form-control'
              id='image'
              onChange={(e) => setImage(e.target.files[0])}
              style={
                errors.image
                  ? {
                      borderColor: 'red',
                      boxShadow: 'none',
                    }
                  : {}
              }
            />
            {errors.image && (
              <small className='text-danger'>{errors.image}</small>
            )}
          </div>
        )}
        <div className='col-md-12 mb-0'>
          <label htmlFor='category' className='form-label' id='category'>
            Categoria
          </label>
          {errors.category && (
            <div>
              <small className='text-danger'>{errors.category}</small>
            </div>
          )}
          <Categories
            categories={categories}
            onCategoriesChange={setCategories}
            showAll={false}
          />
        </div>
        <div className={styles['location-info']}>
          <h3>Localização</h3>
          <div className={`row ${styles['address-wrapper']}`}>
            <div className='col-md'>
              <div className='mt-0'>
                <label htmlFor='postalCode' className='form-label'>
                  CEP
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='postalCode'
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleChange}
                  style={
                    errors.postalCode || !isValidPostalCode
                      ? {
                          borderColor: 'red',
                          boxShadow: 'none',
                        }
                      : {}
                  }
                />
                {errors.postalCode && (
                  <small className='text-danger'>{errors.postalCode}</small>
                )}
                {!isValidPostalCode && (
                  <small className='text-danger' style={{ display: 'block' }}>
                    Cep inválido
                  </small>
                )}
              </div>
              <div className='mt-0'>
                <label htmlFor='neighborhood' className='form-label'>
                  Bairro
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='neighborhood'
                  name='neighborhood'
                  value={address.bairro}
                  disabled
                />
              </div>
            </div>
            <div className='col-md'>
              <div className='mt-0'>
                <label htmlFor='city' className='form-label'>
                  Cidade
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='city'
                  name='city'
                  value={address.localidade}
                  disabled
                  style={
                    errors.postalCode || !isValidPostalCode
                      ? { marginBottom: '35px' }
                      : {}
                  }
                />
              </div>
              <div className='mt-0'>
                <label htmlFor='state' className='form-label'>
                  Estado
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='state'
                  name='state'
                  value={address.estado}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles['contact-info']}>
          <h3>Informações de Contato</h3>
          <div className='row gap-2 mb-0'>
            <div className='col-md-5'>
              <label htmlFor='donorContact' className='form-label'>
                Telefone
              </label>
              <input
                type='text'
                className='form-control'
                id='donorContact'
                placeholder='(00) 00000-0000'
                name='donorContact'
                value={formData.donorContact}
                onChange={handleChange}
                style={
                  errors.donorContact
                    ? {
                        borderColor: 'red',
                        boxShadow: 'none',
                      }
                    : {}
                }
              />
              {errors.donorContact && (
                <small className='text-danger'>{errors.donorContact}</small>
              )}
            </div>
            <div className='col-md'>
              <label htmlFor='donorEmail' className='form-label'>
                E-mail
              </label>
              <input
                type='text'
                className='form-control'
                id='donorEmail'
                placeholder='seu@email.com'
                name='donorEmail'
                value={formData.donorEmail}
                onChange={handleChange}
                style={
                  errors.donorEmail
                    ? {
                        borderColor: 'red',
                        boxShadow: 'none',
                      }
                    : {}
                }
              />
              {errors.donorEmail && (
                <small className='text-danger'>{errors.donorEmail}</small>
              )}
            </div>
          </div>
        </div>
        <div
          className={`col-12 d-flex align-item-center gap-4 ${styles['button-wrapper']}`}
        >
          <button
            className={`btn ${styles['btn-secondary']}`}
            type='button'
            onClick={goToProfile}
          >
            Cancelar
          </button>
          <button type='submit' className='btn btn-success'>
            Atualizar Anúncio
          </button>
        </div>
      </form>
    </div>
  );
}
