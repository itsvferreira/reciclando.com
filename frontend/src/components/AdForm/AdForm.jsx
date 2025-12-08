import Categories from '../Categories/Categories';
import styles from './AdForm.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import STATES_LIST from '../../utils/statesList';

export default function Form({ id }) {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    category: [],
    donorId: 1,
    city: '',
    state: '',
    postalCode: '',
    donorContact: '',
    donorEmail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      category: categories,
    };

    const payload = new FormData();

    if (image) {
      payload.append('image', image);
    }

    payload.append(
      'postRequest',
      new Blob([JSON.stringify(body)], { type: 'application/json' })
    );

    const url = id
      ? `http://localhost:8081/api/v1/ads/${id}`
      : 'http://localhost:8081/api/v1/ads/new';

    try {
      const response = id
        ? await axios.put(url, body)
        : await axios.post(url, payload);

      console.log(
        id ? 'Dados atualizados com sucesso:' : 'Dados enviados com sucesso:',
        response.data
      );
    } catch (error) {
      console.error('Erro ao enviar dados do formulário:', error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/v1/ads/${id}`
        );

        setFormData(response.data);
        setCategories(response.data.category);
      } catch (error) {
        console.error('Erro ao buscar dados do anúncio:', error);
      }
    };

    fetchData();
  }, [id]);

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
          />
        </div>
        <div className='col-md-12'>
          <label htmlFor='description' className='form-label'>
            Descrição
          </label>
          <textarea
            className='form-control'
            placeholder='Descreva os materiais que você tem disponível, quantidade aproximada e qualquer informação adicional relevante...'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            style={{ height: '120px' }}
          ></textarea>
        </div>
        {!id && (
          <div className='col-md-12'>
            <label htmlFor='adImage' className='form-label'>
              Foto do Material
            </label>
            <input
              type='file'
              name='adImage'
              className='form-control'
              id='adImage'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}
        <div className='col-md-12 mb-0'>
          <label htmlFor='category' className='form-label'>
            Categoria
          </label>
          <Categories
            categories={categories}
            onCategoriesChange={setCategories}
            showAll={false}
          />
        </div>
        <div className={styles['location-info']}>
          <h3>Localização</h3>
          <div className='row'>
            <div className='col-md-5 mt-0'>
              <label htmlFor='city' className='form-label'>
                Cidade
              </label>
              <input
                type='text'
                className='form-control'
                id='city'
                name='city'
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className='col-md-4 mt-0'>
              <label htmlFor='state' className='form-label'>
                Estado
              </label>
              <select
                id='state'
                className='form-select'
                name='state'
                onChange={handleChange}
                value={formData.state}
              >
                <option value='' disabled>
                  Selecione uma opção...
                </option>
                {STATES_LIST.map((uf, idx) => (
                  <option key={idx} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-3 mt-0'>
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
              />
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
              />
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
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div
          className={`col-12 d-flex align-item-center gap-4 ${styles['button-wrapper']}`}
        >
          <button className={`btn ${styles['btn-secondary']}`} type='button'>
            Cancelar
          </button>
          <button type='submit' className='btn btn-success'>
            Publicar Anúncio
          </button>
        </div>
      </form>
    </div>
  );
}
