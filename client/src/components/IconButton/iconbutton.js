import Link from 'next/link';

export default function IconButton({linkPage, iconLabel, iconType, customPadding}) {
    const divClass = `rounded-full border-4 border-teal-400 pt-5 w-28 h-28 bg-green-100 transition hover:brightness-[0.95] duration-300 ${customPadding}`
    const iconClass = `fa-solid fa-4x text-teal-400 ${iconType}`
    return (
    <Link href={linkPage} className="flex flex-col items-center mx-5">
        <div className={divClass}>
            <i className={iconClass}></i>
        </div>
        <h1 className="mt-2 text-lg font-bold text-center">{iconLabel}</h1>
    </Link>
    );
  }