import ButtonIcon from '../../ui/ButtonIcon';
import Image from 'next/image';
// import styles from './Header.module.scss';
import useUI from '../../../hooks/useUI';

const Header = () => {
    const { setShowMenuUI, showMenu, title, user } = useUI();

    const handleToggleMenu = () => {
        setShowMenuUI(!showMenu);
    };

    return (
        <div className={'flex h-[70px] w-full border-b border-ultraLightGrey'}>
            <div className={'flex w-full items-center pl-2 md:w-1/2'}>
                {user.rut !== '' && (
                    <ButtonIcon
                        iconName="menu"
                        onClick={handleToggleMenu}
                        color="transparent"
                    />
                )}
                <Image
                    alt="ServiClick"
                    src="/logo.jpg"
                    width={243}
                    height={51}
                    className={'hidden md:block'}
                />
                <Image
                    alt="ServiClick Logo"
                    src="/favicon.png"
                    width={48}
                    height={48}
                    className={'md:hidden'}
                />
            </div>
            <div
                className={
                    'flex h-full w-full items-center bg-primary-500 pl-5 text-[22px] font-semibold text-white md:w-1/2'
                }
            >
                {title}
            </div>
        </div>
    );
};

export default Header;
