import Badge from '../ui/Badge/Badge';
import { MapPin } from 'lucide-react';
import styles from './RecyclerCard.module.css';
import { useNavigate } from 'react-router-dom';

export default function RecyclerCard(props) {
  const {
    imageSrc = 'https://placehold.co/80',
    userId,
    firstName,
    lastName,
    city,
    state,
    neighborhood,
    acceptedMaterials,
  } = props;

  let navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/recicladores/${userId}`);
  };

  return (
    <div className={styles['recycler-card']}>
      <div className={`d-flex align-items-start gap-3 ${styles['card-info']}`}>
        <div className={styles['img-profile']}>
          <img src={imageSrc} alt='' />
        </div>
        <div className='flex-fill'>
          <h5>
            {firstName} {lastName}
          </h5>
          <p className='d-flex align-items-center gap-1 mb-3'>
            <MapPin size={20} />
            <small className='text-body-secondary'>
              {city}, {state}
            </small>
          </p>
          <div className='mb-3 d-flex gap-2'>
            {acceptedMaterials.map((material, idx) => (
              <Badge key={idx} value={material} />
            ))}
          </div>
        </div>
      </div>
      <div className='d-flex align-items-center gap-2'>
        <button
          className={`btn mt-3 btn-success`}
          style={{ width: '100%', textAlign: 'center' }}
          data-bs-toggle='modal'
          data-bs-target={`#exampleModal${userId}`}
          onClick={goToProfile}
        >
          Ver perfil
        </button>
      </div>
    </div>
  );
}
