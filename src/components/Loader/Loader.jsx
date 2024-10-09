import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <TailSpin color="#00BFFF" height={100} width={100} />
    </div>
  );
}
